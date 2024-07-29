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

export const redwoodCopilot = async ({ prompt }) => {
  const debug = true
  const url = 'https://api.langbase.com/beta/chat'
  const apiKey = process.env.LANGBASE_PIPE_API_KEY

  const codebase = readCodebaseFile()
  // console.debug('CODEBASE', codebase)

  const data = {
    messages: [{ role: 'user', content: prompt }],
    variables: [{ name: 'CODEBASE', value: codebase }],
  }

  if (debug) {
    return new Repeater<string>(async (push, stop) => {
      push('Hello, world!')
      push('\n')
      push('This is a debug session')
      push('\n')
      push('Here is the prompt:')
      push('\n')
      push(prompt)
      stop()
    })
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

  return new Repeater<string>(async (push, stop) => {
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
            console.debug(content)
            push(content) // Publish each content piece as received
          }
        }
      }
    }

    stop.then(() => {
      logger.debug('cancel')
    })
  })
}
