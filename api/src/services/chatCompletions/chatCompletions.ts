import { Repeater } from '@redwoodjs/realtime'

import { readCodebaseFile } from 'src/lib/chatCompletions/codeGenerator'
import {
  streamEmptyPromptCompletion,
  streamDebugChatCompletion,
  streamErrorCompletion,
} from 'src/lib/chatCompletions/helpers'
import type { ChatCompletion } from 'src/lib/chatCompletions/types'
import { logger } from 'src/lib/logger'
import { openAIClient } from 'src/lib/openAI/openAI'

export const createChatCompletion = async ({ input }) => {
  const { prompt, debug, _stream } = input

  logger.debug('prompt', prompt)

  if (!prompt || prompt.trim() === '') {
    return streamEmptyPromptCompletion(prompt)
  }

  if (debug) {
    return streamDebugChatCompletion(prompt)
  }

  const data = {
    messages: [{ role: 'user', content: prompt }],
    variables: [{ name: 'CODEBASE', value: readCodebaseFile() }],
  }

  logger.debug(data, '>>> data')

  return new Repeater<ChatCompletion>(async (push, stop) => {
    const publish = async () => {
      try {
        const stream = await openAIClient.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content:
                "You're a helpful AI assistant that is an expert in web development and developer tools and technologies including Prisma, GraphQL, SQL, React, Javascript, Typescript and RedwoodJS. Be concise in your answers.",
            },
            {
              role: 'user',
              content: `Use the following RedwoodJS application codebase to answer questions:

            ${readCodebaseFile()}`,
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          stream: true as const,
        })
        logger.debug('OpenAI stream received started ...')

        for await (const part of stream) {
          const { content } = part.choices[0].delta

          if (content) {
            logger.debug({ content }, 'OpenAI stream received ...')

            const chatCompletion = {
              id: '1',
              threadId: '1',
              message: `${content}`,
              prompt,
            }
            console.debug(chatCompletion, 'Publish chat chunk')
            push(chatCompletion)
          }
        }

        logger.debug('OpenAI stream received ended.')
        stop()
      } catch (error) {
        logger.error('Error in OpenAI stream:', error)
        return streamErrorCompletion(prompt)
      }
    }

    publish()

    await stop.then(() => {
      logger.debug('stream done')
    })
  })

  // response.

  // if (!response.ok) {
  //   return streamErrorCompletion(prompt)
  // }

  // const reader = response.body.getReader()
  // const decoder = new TextDecoder('utf-8')

  // return new Repeater<ChatCompletion>(async (push, stop) => {
  //   // eslint-disable-next-line no-constant-condition
  //   while (true) {
  //     const { done, value } = await reader.read()
  //     if (done) {
  //       stop()
  //       break
  //     }
  //     const chunk = decoder.decode(value)
  //     const lines = chunk.split('\n').filter((line) => line.trim() !== '')

  //     for (const line of lines) {
  //       if (line.startsWith('data:')) {
  //         const data = line.substring('data:'.length).trim()
  //         if (data === '[DONE]') {
  //           stop()
  //           break
  //         }
  //         try {
  //           const json = JSON.parse(data)
  //           if (json.choices[0]?.delta?.content) {
  //             const content = json.choices[0].delta.content
  //             const chatCompletion = {
  //               id: '1',
  //               threadId: '1',
  //               message: content,
  //               prompt,
  //             }
  //             console.debug(chatCompletion, 'Publish chat chunk')
  //             push(chatCompletion)
  //           }
  //         } catch (error) {
  //           logger.warn({ error, data }, 'Error parsing JSON chunk')
  //         }
  //       }
  //     }
  //   }

  //   stop.then(() => {
  //     logger.debug('cancel')
  //   })
  // })
}
