import { Repeater } from '@redwoodjs/realtime'

import {
  streamEmptyPromptCompletion,
  streamDebugChatCompletion,
  streamErrorCompletion,
} from 'src/lib/chatCompletions/helpers'
import type { ChatCompletion } from 'src/lib/chatCompletions/types'
import { readCodebaseFile } from 'src/lib/codebaseGenerator/codebase'
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

  return new Repeater<ChatCompletion>(async (push, stop) => {
    const publish = async () => {
      try {
        const stream = await openAIClient.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content:
                "You're a helpful AI assistant that is an expert in web development and developer tools and technologies including Prisma, GraphQL, SQL, React, Javascript, Typescript and RedwoodJS. Be concise in your answers. Respond in markdown.",
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
              id: part.id,
              threadId: part.id,
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
}
