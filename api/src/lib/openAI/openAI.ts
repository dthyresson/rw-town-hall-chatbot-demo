import OpenAI from 'openai'

// Uses Unkey semantic cache gateway to cache responses from OpenAI
// https://unkey.io/docs/semantic-cache
// using the baseURL: https://auxiliary-solid-state-tennessine-4901.llm.unkey.io
export const openAIClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://auxiliary-solid-state-tennessine-4901.llm.unkey.io',
})

import { readCodebaseFile } from 'src/lib/codebaseGenerator/codebase'

export const stream = (prompt: string) =>
  openAIClient.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content:
          "You're a helpful AI assistant that is an expert in web development and developer tools and technologies including Prisma, GraphQL, SQL, React, Javascript, Typescript and RedwoodJS. Be concise in your answers. Respond in markdown.",
      },
      {
        role: 'user',
        content: `Use the following RedwoodJS application codebase to answer questions:

     ${readCodebaseFile()}`,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    stream: true as const,
    // This mimics Langbase's "Precise" setting
    max_tokens: 1000,
    frequency_penalty: 0.5,
    presence_penalty: 0.5,
    temperature: 0.2,
    top_p: 0.75,
  })
