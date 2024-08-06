import { ChatResponse } from 'types/shared-schema-types'

import { ChatRepeater } from 'src/lib/chat/ChatRepeater'
import { stream as langbaseStream } from 'src/lib/langbase/langbase'
import { logger } from 'src/lib/logger'
import { stream as openAIStream } from 'src/lib/openAI/openAI'
import { streamWithUnkeyCache as openAIStreamWithUnkeyCache } from 'src/lib/openAI/openAI'
interface ChatResponseFunction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (part: any, content: string, prompt: string): ChatResponse
}

const buildChatResponseFunction: ChatResponseFunction = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  part: any,
  content: string,
  prompt: string
): ChatResponse => {
  return {
    id: part.id,
    message: content,
    prompt,
  }
}

export const chat = async ({ input }) => {
  const { prompt, debug, provider } = input

  logger.debug('prompt', prompt)

  const promptFunction =
    provider === 'OPENAI'
      ? openAIStream
      : provider === 'OPENAI_WITH_UNKEY_CACHE'
      ? openAIStreamWithUnkeyCache
      : langbaseStream

  return ChatRepeater({
    promptFunction,
    prompt,
    debug,
    buildChatResponseFunction,
  })
}
