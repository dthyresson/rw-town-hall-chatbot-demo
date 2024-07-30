import fs from 'fs'
import path from 'path'

import { getPaths } from '@redwoodjs/internal'
import { Repeater } from '@redwoodjs/realtime'

import { logger } from 'src/lib/logger'

const CODEBASE = 'CODEBASE_TOC.md'

const readCodebaseFile = () => {
  const paths = getPaths()
  const filePath = path.join(paths.base, CODEBASE)
  return fs.readFileSync(filePath, 'utf-8')
}

const seconds = 200

type ChatCompletion = {
  id: string
  threadId: string
  message: string
  prompt: string
}

const streamDebugChatCompletion = (prompt: string) => {
  logger.debug({ prompt }, 'debug mode prompt')

  return new Repeater<ChatCompletion>(async (push, stop) => {
    const messages = ['Hello ', 'world!', '\n', 'This is ', 'a debug ', 'session'];

    for (const message of messages) {
      logger.debug({ message, prompt }, 'debug mode message')
      await push({ id: '1', threadId: '2', message, prompt })
      logger.debug(`Delaying for ${seconds}ms`)
      await new Promise(resolve => setTimeout(resolve, seconds))
      logger.debug('Delay complete')
    }

    logger.debug('All messages sent')
    stop()
  })
}

export const createChatCompletion =  async ({ input }) => {
  const { prompt, debug, stream } = input

  const url = 'https://api.langbase.com/beta/chat'
  const apiKey = process.env.LANGBASE_PIPE_API_KEY

  logger.debug('prompt', prompt)

  if (!prompt || prompt.trim() === '') {
    logger.warn('prompt is empty')
    return new Repeater<ChatCompletion>(async (push, stop) => {
      const messages = ['Did you ', 'mean to ask ', 'something?'];

      for (const message of messages) {
        logger.debug({ message, prompt }, 'empty prompt message')
        await push({ id: '1', threadId: '1', message, prompt })
        logger.debug(`Delaying for ${seconds}ms`)
        await new Promise(resolve => setTimeout(resolve, seconds))
        logger.debug('Delay complete')
      }

      logger.debug('All empty prompt messages sent')
      stop()
    })
  }

  if (debug) {
    return streamDebugChatCompletion(prompt)
    }

  const codebase = readCodebaseFile()
  // console.debug('CODEBASE', codebase)
  const data = {
    messages: [{ role: 'user', content: prompt }],
    variables: [{ name: 'CODEBASE', value: codebase }],
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: apiKey,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) return console.error(await response.json())

  const reader = response.body.getReader()
  const decoder = new TextDecoder('utf-8')

  return new Repeater<ChatCompletion>(async (push, stop) => {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        stop()
        break
      }
      const chunk = decoder.decode(value)
      const lines = chunk.split('\n').filter((line) => line.trim() !== '')

      for (const line of lines) {
        if (line.startsWith('data:')) {
          const data = line.substring('data:'.length).trim()
          if (data === '[DONE]') {
            stop()
            break
          }
          const json = JSON.parse(data)
          if (json.choices[0].delta.content) {
            const content = json.choices[0].delta.content
            const chatCompletion = {
              id: '1',
              threadId: '1',
              message: content,
              prompt,
            }
            console.debug(chatCompletion, "Publish each content piece as received")
            push(chatCompletion)
          }
        }
      }
    }

    stop.then(() => {
      logger.debug('cancel')
    })
  })
}