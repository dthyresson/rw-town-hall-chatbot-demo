import { Repeater } from '@redwoodjs/realtime'

import type { ChatCompletion } from 'src/lib/chatCompletions/types'
import { logger } from 'src/lib/logger'

const DEFAULT_DELAY_SECONDS = 200

const streamCompletion = (
  prompt = '',
  messages: string[],
  _delay: number = DEFAULT_DELAY_SECONDS
) => {
  return new Repeater<ChatCompletion>(async (push, stop) => {
    for (const message of messages) {
      logger.debug({ message, prompt }, 'debug mode message')
      await push({ id: '1', threadId: '2', message, prompt })
      logger.debug(`Delaying for ${DEFAULT_DELAY_SECONDS}ms`)
      await new Promise((resolve) => setTimeout(resolve, DEFAULT_DELAY_SECONDS))
      logger.debug('Delay complete')
    }

    logger.debug('All messages sent')
    stop()
  })
}

export const streamDebugChatCompletion = (prompt: string) => {
  logger.debug({ prompt }, 'debug mode prompt')

  return streamCompletion(prompt, [
    'Hello ',
    'world!',
    '\n',
    'This is ',
    'a debug ',
    'session',
  ])
}

export const streamEmptyPromptCompletion = (prompt: string) => {
  logger.warn('prompt is empty')
  const messages = ['Did you ', 'mean to ask ', 'something?']
  return streamCompletion(prompt, messages)
}

export const streamErrorCompletion = (prompt: string) => {
  logger.error('error')
  return streamCompletion(prompt, ['Oops ', 'somethiig went ', 'wrong!'])
}
