import { OpenAIStream } from 'ai'

export const LANGBASE_MEMORY_DOCUMENTS_ENDPOINT =
  process.env.LANGBASE_API_URL ||
  'https://api.langbase.com/beta/user/memorysets/documents'

export const LANGBASE_API_KEY = process.env.LANGBASE_API_KEY

export const LANGBASE_CHAT_ENDPOINT = 'https://api.langbase.com/beta/chat'

export const streamChatCompletion = async ({
  prompt,
  codebase,
}: {
  prompt: string
  codebase: string
}) => {
  const data = {
    messages: [{ role: 'user', content: prompt }],
    variables: [{ name: 'CODEBASE', value: codebase }],
  }

  const response = await fetch(LANGBASE_CHAT_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${LANGBASE_API_KEY}`,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const stream = OpenAIStream(response)
  return new Response(stream)
}
