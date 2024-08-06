import fs from 'fs'

import { Pipe } from 'langbase'

import { logger } from 'src/lib/logger'

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

export const getSignedUploadUrl = async ({ fileName, memory }) => {
  if (!LANGBASE_API_KEY) {
    throw new Error('LANGBASE_API_KEY is not set in the environment variables')
  }

  const memoryName = memory || process.env.LANGBASE_MEMORY_NAME
  const ownerLogin = process.env.LANGBASE_OWNER_LOGIN

  if (!memoryName || !ownerLogin) {
    throw new Error(
      'LANGBASE_MEMORY_NAME and LANGBASE_OWNER_LOGIN must be set in the environment variables'
    )
  }

  const newDoc = {
    memoryName,
    ownerLogin,
    fileName,
  }

  logger.info('Creating new document in Langbase:', newDoc)
  logger.info('URL:', LANGBASE_MEMORY_DOCUMENTS_ENDPOINT)
  logger.info('API Key:', LANGBASE_API_KEY)

  const response = await fetch(LANGBASE_MEMORY_DOCUMENTS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${LANGBASE_API_KEY}`,
    },
    body: JSON.stringify(newDoc),
  })

  const signedUploadUrl = await response.json()

  return signedUploadUrl
}

export const uploadDocument = async ({ signedUrl, filePath, contentType }) => {
  const file = fs.readFileSync(filePath, 'utf-8')
  logger.info({ signedUrl }, 'Uploading document to Langbase')
  try {
    const response = await fetch(signedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': contentType || 'text/markdown',
      },
      body: file,
    })

    logger.info({ response }, 'Document uploaded to Langbase')

    return response
  } catch (error) {
    logger.error({ error }, 'Error uploading document to Langbase')
    throw error
  }
}
