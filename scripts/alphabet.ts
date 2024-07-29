// To access your database
// Append api/* to import from api and web/* to import from web
// import { db } from 'api/src/lib/db'

export default async ({ args }) => {
  console.log(':: Executing script with args ::')
  console.log(args)

  const response = await fetch('http://localhost:8911/graphql', {
    method: 'POST',
    headers: {
      accept: 'multipart/mixed',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query: 'query StreamAlphabet { alphabet @stream }',
    }),
  })

  const reader = response.body.getReader()
  const decoder = new TextDecoder('utf-8')
  let result = ''

  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    result += decoder.decode(value, { stream: true })
    console.log(result) // Render each letter as stream streams
  }
}
