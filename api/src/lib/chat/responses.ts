import type { ChatResponse } from 'types/shared-schema-types'

import { Repeater } from '@redwoodjs/realtime'

import { logger } from 'src/lib/logger'

const DEFAULT_DELAY_SECONDS = 200

const simulateChatResponseStream = (
  prompt = '',
  messages: string[],
  delay: number = DEFAULT_DELAY_SECONDS,
  initialDelay = 0
) => {
  return new Repeater<ChatResponse>(async (push, stop) => {
    await new Promise((resolve) => setTimeout(resolve, initialDelay))
    for (const message of messages) {
      logger.debug({ message, prompt }, 'debug mode message')
      await push({ id: '1', message, prompt })
      logger.debug(`Delaying for ${delay}ms`)
      await new Promise((resolve) => setTimeout(resolve, delay))
      logger.debug('Delay complete')
    }

    logger.debug('All messages sent')
    stop()
  })
}

export const debugChatResponse = (prompt: string) => {
  logger.debug({ prompt }, 'debug mode prompt')

  return simulateChatResponseStream(
    prompt,
    ['Hello ', 'world!', '\n', 'This is ', 'a debug ', 'session'],
    DEFAULT_DELAY_SECONDS,
    2_250
  )
}

export const emptyPromptChatResponse = (prompt: string) => {
  logger.warn('prompt is empty')
  const messages = ['Did you ', 'mean to ask ', 'something?']
  return simulateChatResponseStream(prompt, messages)
}

export const errorChatResponse = (prompt: string) => {
  logger.error('error')
  return simulateChatResponseStream(prompt, [
    'Oops ',
    'something went ',
    'wrong!',
  ])
}
