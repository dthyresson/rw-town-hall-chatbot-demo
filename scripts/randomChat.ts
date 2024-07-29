// To access your database
// Append api/* to import from api and web/* to import from web
import { rooms } from 'api/src/services/rooms/rooms'
import fetch from 'node-fetch'

const names = [
  'Emma',
  'Liam',
  'Olivia',
  'Noah',
  'Ava',
  'Ethan',
  'Sophia',
  'Mason',
  'Isabella',
  'William',
  'Mia',
  'James',
  'Charlotte',
  'Benjamin',
  'Amelia',
  'Lucas',
  'Harper',
  'Henry',
  'Evelyn',
  'Alexander',
]

const friendlyMessages = [
  "Hey, how's it going?",
  "What's up?",
  "How's your day been?",
  'Nice to see you!',
  'What have you been up to lately?',
  "How's the weather there?",
  'Any exciting plans for the weekend?',
  'Did you catch the game last night?',
  'Have you tried that new restaurant downtown?',
  "How's work going?",
  'Long time no see!',
  "What's new with you?",
  'Happy Friday!',
  'TGIF! Any fun plans?',
  "How's your family doing?",
  'Did you hear about...?',
  "I'm thinking of watching a movie, any recommendations?",
  "How's that project coming along?",
  'Just wanted to say hi!',
  'Coffee soon?',
  'Miss chatting with you!',
  'How was your vacation?',
  "Crazy weather we're having, right?",
  'Have you read any good books lately?',
  "What's your favorite show right now?",
  'Did you see that viral video going around?',
  "How's the new job?",
  'Thinking of you!',
  "Hope you're having a great day!",
  'Remember that time when...?',
]

export default async ({ args }) => {
  console.log(':: Executing script with args ::')
  console.log(args)

  const { isProd = false, numMessages = 40 } = args

  const url = isProd
    ? 'https://readily-stunning-serval.grove.run/.redwood/functions/graphql'
    : 'http://localhost:8911/graphql'

  const allRooms = await rooms()

  for (let i = 0; i < numMessages; i++) {
    const roomId = allRooms[Math.floor(Math.random() * allRooms.length)]
    console.log(':: Room ID ::')
    console.log(roomId)

    const message = {
      body: friendlyMessages[
        Math.floor(Math.random() * friendlyMessages.length)
      ],
      from: names[Math.floor(Math.random() * names.length)],
    }

    const mutation = `
      mutation {
        sendMessage(input: {
          roomId: "${roomId}",
          from: "${message.from}",
          body: "${message.body}"
        }) {
          from
          body
        }
      }
    `

    const body = JSON.stringify({ query: mutation })

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-allow-mutations': 'true',
      },
      body,
    })

    const result = await response.json()
    console.log('Sent message to room', roomId, ':', result.data.sendMessage)

    // sleep for 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }
}
