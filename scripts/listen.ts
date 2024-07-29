import fetch from 'node-fetch' // Add import for fetch

export default async ({ args }) => {
  // Your script here...
  console.log(':: Executing script with args ::')
  console.log(args)
  const { roomId = 1 } = args
  //   {
  //     "operationName": "ListenForNewMessagesInRoom",
  //     "variables": { "roomId": ${roomId} },
  //     "extensions": {
  //       "persistedQuery": {
  //         "version": 1,
  //         "sha256Hash": "a8c92d9b67b0765d1899b9f5129bd61400d4ee52"
  //       }
  //     },
  //   }
  // `
  const subscription = {
    operationName: 'ListenForNewMessagesInRoom',
    variables: { roomId },
    extensions: {
      persistedQuery: {
        version: 1,
        sha256Hash: 'a8c92d9b67b0765d1899b9f5129bd61400d4ee52',
      },
    },
  }

  const body = JSON.stringify({ ...subscription })
  console.log(body)

  const response = await fetch('http://localhost:8911/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'x-allow-arbitrary-operations': 'true',
    },
    body,
  })

  const data = await response.json()
  console.log(data)
}
