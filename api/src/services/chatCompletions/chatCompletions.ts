import { Repeater } from '@redwoodjs/realtime'

import {
  streamEmptyPromptCompletion,
  streamDebugChatCompletion,
  streamErrorCompletion,
} from 'src/lib/chatCompletions/helpers'
import type { ChatCompletion } from 'src/lib/chatCompletions/types'
import { stream as langbaseStream } from 'src/lib/langbase/langbase'
import { logger } from 'src/lib/logger'
import { stream as openAIStream } from 'src/lib/openAI/openAI'

export const createChatCompletion = async ({ input }) => {
  const { prompt, debug, _stream } = input

  logger.debug('prompt', prompt)

  const promptFunction = _stream ? openAIStream : langbaseStream
  const buildChatCompletion = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    part: any,
    content: string,
    prompt: string
  ): ChatCompletion => {
    return {
      id: part.id,
      threadId: part.id,
      message: content,
      prompt,
    }
  }
  return chat({ promptFunction, prompt, debug, buildChatCompletion })
}

const chat = async ({ promptFunction, prompt, debug, buildChatCompletion }) => {
  if (!prompt || prompt.trim() === '') {
    return streamEmptyPromptCompletion(prompt)
  }

  if (debug) {
    return streamDebugChatCompletion(prompt)
  }
  return new Repeater<ReturnType<typeof buildChatCompletion>>(
    async (push, stop) => {
      const publish = async () => {
        try {
          logger.debug('>> stream requested ...')

          const stream = await promptFunction(prompt)

          logger.debug('>> stream received started ...')

          for await (const part of stream) {
            const { content } = part.choices[0].delta

            if (content) {
              logger.debug({ content }, '>> stream received ...')
              const chatCompletion = buildChatCompletion(part, content, prompt)
              console.debug(chatCompletion, 'Publish chat chunk')
              push(chatCompletion)
            }
          }

          logger.debug('>> stream received ended.')

          stop()
        } catch (error) {
          logger.error(error, 'Error in >> stream:')
          return streamErrorCompletion(prompt)
        }
      }

      publish()

      await stop.then(() => {
        logger.debug('stream done')
      })
    }
  )
}
