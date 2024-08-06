import { Repeater } from '@redwoodjs/realtime'

import { logger } from 'src/lib/logger'

import {
  debugChatResponse,
  emptyPromptChatResponse,
  errorChatResponse,
} from './responses'

export const ChatRepeater = async ({
  promptFunction,
  prompt,
  debug,
  buildChatResponseFunction,
}) => {
  if (!prompt || prompt.trim() === '') {
    return emptyPromptChatResponse(prompt)
  }

  if (debug) {
    return debugChatResponse(prompt)
  }
  return new Repeater<ReturnType<typeof buildChatResponseFunction>>(
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
              const chatResponse = buildChatResponseFunction(
                part,
                content,
                prompt
              )
              console.debug(chatResponse, 'Publish chat chunk')
              push(chatResponse)
            }
          }

          logger.debug('>> stream received ended.')

          stop()
        } catch (error) {
          logger.error(error, 'Error in >> stream:')
          return errorChatResponse(prompt)
        }
      }

      publish()

      await stop.then(() => {
        logger.debug('stream done')
      })
    }
  )
}
