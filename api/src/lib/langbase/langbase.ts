import { Pipe } from 'langbase'

export const LANGBASE_MEMORY_DOCUMENTS_ENDPOINT =
  process.env.LANGBASE_API_URL ||
  'https://api.langbase.com/beta/user/memorysets/documents'

export const LANGBASE_API_KEY = process.env.LANGBASE_API_KEY

export const LANGBASE_CHAT_ENDPOINT = 'https://api.langbase.com/beta/chat'

export const pipe = new Pipe({
  // Make sure you have a .env file with any pipe you wanna use.
  // As a demo we're using a pipe that has less wordy responses.
  apiKey: process.env.LANGBASE_PIPE_API_KEY,
})

export const stream = (prompt: string) =>
  pipe.streamText({
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })
