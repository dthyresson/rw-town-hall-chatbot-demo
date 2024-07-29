import fetch from 'node-fetch' // Add import for fetch

export default async ({ args }) => {
  // Your script here...
  console.log(':: Executing script with args ::')

  console.log(args)

  const { numberOfBids = 10 } = args

  // amounts
  const amounts = []
  for (let i = 0; i < numberOfBids; i++) {
    // random amount between 5 and 20
    const amount = Math.floor(Math.random() * 15) + 5
    const lastAmount = amounts[amounts.length - 1] || 0
    amounts.push(amount + lastAmount)
  }

  // post a bid for each amount
  for (const amount of amounts) {
    // random auctionId between 1 and 5
    const auctionId = Math.floor(Math.random() * 5) + 1

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

    // wait 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }
}
