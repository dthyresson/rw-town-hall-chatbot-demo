import fetch from 'node-fetch' // Add import for fetch

export default async ({ args }) => {
  // Your script here...
  console.log(':: Executing script with args ::')
  console.log(args)
  const { amount = 100, auctionId = 1 } = args

  const mutation = `
    mutation {
      bid(input: { auctionId: ${auctionId}, amount: ${amount} }) {
        amount
      }
    }
  `

  const body = JSON.stringify({ query: mutation })

  const response = await fetch('http://localhost:8911/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })

  const data = await response.json()
  console.log(data)
}
