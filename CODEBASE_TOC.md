#  Redwood App - Codebase Table of Contents

## Readme

#### README.md

```md file="README.md"
# README

Welcome to [RedwoodJS](https://redwoodjs.com)!

> **Prerequisites**
>
> - Redwood requires [Node.js](https://nodejs.org/en/) (=20.x) and [Yarn](https://yarnpkg.com/)
> - Are you on Windows? For best results, follow our [Windows development setup](https://redwoodjs.com/docs/how-to/windows-development-setup) guide

Start by installing dependencies:

```
yarn install
```

Then start the development server:

```
yarn redwood dev
```

Your browser should automatically open to [http://localhost:8910](http://localhost:8910) where you'll see the Welcome Page, which links out to many great resources.

> **The Redwood CLI**
>
> Congratulations on running your first Redwood CLI command! From dev to deploy, the CLI is with you the whole way. And there's quite a few commands at your disposal:
>
> ```
> yarn redwood --help
> ```
>
> For all the details, see the [CLI reference](https://redwoodjs.com/docs/cli-commands).

## Prisma and the database

Redwood wouldn't be a full-stack framework without a database. It all starts with the schema. Open the [`schema.prisma`](api/db/schema.prisma) file in `api/db` and replace the `UserExample` model with the following `Post` model:

```prisma
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  body      String
  createdAt DateTime @default(now())
}
```

Redwood uses [Prisma](https://www.prisma.io/), a next-gen Node.js and TypeScript ORM, to talk to the database. Prisma's schema offers a declarative way of defining your app's data models. And Prisma [Migrate](https://www.prisma.io/migrate) uses that schema to make database migrations hassle-free:

```
yarn rw prisma migrate dev

# ...

? Enter a name for the new migration: › create posts
```

> `rw` is short for `redwood`

You'll be prompted for the name of your migration. `create posts` will do.

Now let's generate everything we need to perform all the CRUD (Create, Retrieve, Update, Delete) actions on our `Post` model:

```
yarn redwood generate scaffold post
```

Navigate to [http://localhost:8910/posts/new](http://localhost:8910/posts/new), fill in the title and body, and click "Save".

Did we just create a post in the database? Yup! With `yarn rw generate scaffold <model>`, Redwood created all the pages, components, and services necessary to perform all CRUD actions on our posts table.

## Frontend first with Storybook

Don't know what your data models look like? That's more than ok—Redwood integrates Storybook so that you can work on design without worrying about data. Mockup, build, and verify your React components, even in complete isolation from the backend:

```
yarn rw storybook
```

Seeing "Couldn't find any stories"? That's because you need a `*.stories.{tsx,jsx}` file. The Redwood CLI makes getting one easy enough—try generating a [Cell](https://redwoodjs.com/docs/cells), Redwood's data-fetching abstraction:

```
yarn rw generate cell examplePosts
```

The Storybook server should hot reload and now you'll have four stories to work with. They'll probably look a little bland since there's no styling. See if the Redwood CLI's `setup ui` command has your favorite styling library:

```
yarn rw setup ui --help
```

## Testing with Jest

It'd be hard to scale from side project to startup without a few tests. Redwood fully integrates Jest with both the front- and back-ends, and makes it easy to keep your whole app covered by generating test files with all your components and services:

```
yarn rw test
```

To make the integration even more seamless, Redwood augments Jest with database [scenarios](https://redwoodjs.com/docs/testing#scenarios)  and [GraphQL mocking](https://redwoodjs.com/docs/testing#mocking-graphql-calls).

## Ship it

Redwood is designed for both serverless deploy targets like Netlify and Vercel and serverful deploy targets like Render and AWS:

```
yarn rw setup deploy --help
```

Don't go live without auth! Lock down your app with Redwood's built-in, database-backed authentication system ([dbAuth](https://redwoodjs.com/docs/authentication#self-hosted-auth-installation-and-setup)), or integrate with nearly a dozen third-party auth providers:

```
yarn rw setup auth --help
```

## Next Steps

The best way to learn Redwood is by going through the comprehensive [tutorial](https://redwoodjs.com/docs/tutorial/foreword) and joining the community (via the [Discourse forum](https://community.redwoodjs.com) or the [Discord server](https://discord.gg/redwoodjs)).

## Quick Links

- Stay updated: read [Forum announcements](https://community.redwoodjs.com/c/announcements/5), follow us on [Twitter](https://twitter.com/redwoodjs), and subscribe to the [newsletter](https://redwoodjs.com/newsletter)
- [Learn how to contribute](https://redwoodjs.com/docs/contributing)

```


## Redwood Config

#### redwood.toml

```toml file="redwood.toml"
# This file contains the configuration settings for your Redwood app.
# This file is also what makes your Redwood app a Redwood app.
# If you remove it and try to run `yarn rw dev`, you'll get an error.
#
# For the full list of options, see the "App Configuration: redwood.toml" doc:
# https://redwoodjs.com/docs/app-configuration-redwood-toml

[web]
  title = "Redwood App"
  port = 8910
  apiUrl = "/.redwood/functions" # You can customize graphql and dbauth urls individually too: see https://redwoodjs.com/docs/app-configuration-redwood-toml#api-paths
  includeEnvironmentVariables = [
    # Add any ENV vars that should be available to the web side to this array
    # See https://redwoodjs.com/docs/environment-variables#web
  ]
[api]
  port = 8911
[browser]
  open = false
[notifications]
  versionUpdates = ["latest"]
[generate]
  tests = false
  stories = false


```


## API

### GraphQL Schema

#### .redwood/schema.graphql

```graphql file=".redwood/schema.graphql"
"""
Instruction for establishing a live connection that is updated once the underlying data changes.
"""
directive @live(
  """Whether the query should be live or not."""
  if: Boolean = true

  """
  Propose a desired throttle interval ot the server in order to receive updates to at most once per "throttle" milliseconds. The server must not accept this value.
  """
  throttle: Int
) on QUERY

"""
Use to check whether or not a user is authenticated and is associated
with an optional set of roles.
"""
directive @requireAuth(roles: [String]) on FIELD_DEFINITION

"""Use to skip authentication checks and allow public access."""
directive @skipAuth on FIELD_DEFINITION

type Auction {
  bids: [Bid!]!
  highestBid: Bid
  id: ID!
  title: String!
}

type Bid {
  amount: Int!
}

input BidInput {
  amount: Int!
  auctionId: ID!
}

scalar BigInt

scalar Byte

scalar Date

scalar DateTime

scalar JSON

scalar JSONObject

type Message {
  body: String
  from: String
}

type Mutation {
  bid(input: BidInput!): Bid
  sendMessage(input: SendMessageInput!): Message!
}

"""About the Redwood queries."""
type Query {
  """
  A field that spells out the letters of the alphabet
  Maybe you want to @stream this field ;)
  """
  alphabet: [String!]!
  auction(id: ID!): Auction
  auctions: [Auction!]!

  """A field that resolves fast."""
  fastField: String!

  """Fetches the Redwood root schema."""
  redwood: Redwood
  room(id: ID!): [Message!]!
  rooms: [ID!]!

  """
  A field that resolves slowly.
  Maybe you want to @defer this field ;)
  """
  slowField(waitFor: Int! = 5000): String
}

"""
The RedwoodJS Root Schema

Defines details about RedwoodJS such as the current user and version information.
"""
type Redwood {
  """The current user."""
  currentUser: JSON

  """The version of Prisma."""
  prismaVersion: String

  """The version of Redwood."""
  version: String
}

input SendMessageInput {
  body: String!
  from: String!
  roomId: ID!
}

type Subscription {
  countdown(from: Int!, interval: Int!): Int!
  newMessage(roomId: ID!): Message!
}

scalar Time
```

### DB

#### api/db/schema.prisma

```prisma file="api/db/schema.prisma"
// Don't forget to tell Prisma about your edits to this file using
// `yarn rw prisma migrate dev` or `yarn rw prisma db push`.
// `migrate` is like committing while `push` is for prototyping.
// Read more about both here:
// https://www.prisma.io/docs/orm/prisma-migrate

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider      = "prisma-client-js"
  binaryTargets = "native"
}

// Define your own datamodels here and run `yarn redwood prisma migrate dev`
// to create migrations for them and apply to your dev DB.
// TODO: Please remove the following example:
model UserExample {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}

```

### Server

#### api/src/server.ts

```ts file="api/src/server.ts"
import { createServer } from '@redwoodjs/api-server'

import { logger } from 'src/lib/logger'

async function main() {
  const server = await createServer({
    logger,
  })

  await server.start()
}

main()

```

### Lib

#### api/src/lib/auth.ts

```ts file="api/src/lib/auth.ts"
/**
 * Once you are ready to add authentication to your application
 * you'll build out requireAuth() with real functionality. For
 * now we just return `true` so that the calls in services
 * have something to check against, simulating a logged
 * in user that is allowed to access that service.
 *
 * See https://redwoodjs.com/docs/authentication for more info.
 */
export const isAuthenticated = () => {
  return true
}

export const hasRole = ({ roles }) => {
  return roles !== undefined
}

// This is used by the redwood directive
// in ./api/src/directives/requireAuth

// Roles are passed in by the requireAuth directive if you have auth setup
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
export const requireAuth = ({ roles }) => {
  return isAuthenticated()
}

export const getCurrentUser = async () => {
  throw new Error(
    'Auth is not set up yet. See https://redwoodjs.com/docs/authentication ' +
      'to get started'
  )
}

```

#### api/src/lib/db.ts

```ts file="api/src/lib/db.ts"
// See https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/constructor
// for options.

import { PrismaClient } from '@prisma/client'

import { emitLogLevels, handlePrismaLogging } from '@redwoodjs/api/logger'

import { logger } from './logger'

/*
 * Instance of the Prisma Client
 */
export const db = new PrismaClient({
  log: emitLogLevels(['info', 'warn', 'error']),
})

handlePrismaLogging({
  db,
  logger,
  logLevels: ['info', 'warn', 'error'],
})

```

#### api/src/lib/logger.ts

```ts file="api/src/lib/logger.ts"
import { createLogger } from '@redwoodjs/api/logger'

/**
 * Creates a logger with RedwoodLoggerOptions
 *
 * These extend and override default LoggerOptions,
 * can define a destination like a file or other supported pino log transport stream,
 * and sets whether or not to show the logger configuration settings (defaults to false)
 *
 * @param RedwoodLoggerOptions
 *
 * RedwoodLoggerOptions have
 * @param {options} LoggerOptions - defines how to log, such as redaction and format
 * @param {string | DestinationStream} destination - defines where to log, such as a transport stream or file
 * @param {boolean} showConfig - whether to display logger configuration on initialization
 */
export const logger = createLogger({ options: { level: 'debug' } })

```

#### api/src/lib/realtime.ts

```ts file="api/src/lib/realtime.ts"
import { RedwoodRealtimeOptions } from '@redwoodjs/realtime'

import subscriptions from 'src/subscriptions/**/*.{js,ts}'

// if using a Redis store
// import { Redis } from 'ioredis'
// const publishClient = new Redis()
// const subscribeClient = new Redis()

/**
 * Configure RedwoodJS Realtime
 *
 * See https://redwoodjs.com/docs/realtime
 *
 * Realtime supports Live Queries and Subscriptions over GraphQL SSE.
 *
 * Live Queries are GraphQL queries that are automatically re-run when the data they depend on changes.
 *
 * Subscriptions are GraphQL queries that are run when a client subscribes to a channel.
 *
 * Redwood Realtime
 *  - uses a publish/subscribe model to broadcast data to clients.
 *  - uses a store to persist Live Query and Subscription data.
 *  - and enable defer and stream directives to improve latency
 *    for clients by sending data the most important data as soon as it's ready.
 *
 * Redwood Realtime supports in-memory and Redis stores:
 * - In-memory stores are useful for development and testing.
 * - Redis stores are useful for production.
 *
 */
export const realtime: RedwoodRealtimeOptions = {
  subscriptions: {
    subscriptions,
    store: 'in-memory',
    // if using a Redis store
    // store: { redis: { publishClient, subscribeClient } },
  },
  liveQueries: {
    store: 'in-memory',
    // if using a Redis store
    // store: { redis: { publishClient, subscribeClient } },
  },
  // To enable defer and streaming, set to true.
  enableDeferStream: true,
}

```

### GraphQL

#### api/src/graphql/alphabet.sdl.ts

```ts file="api/src/graphql/alphabet.sdl.ts"
export const schema = gql`
  type Query {
    """
    A field that spells out the letters of the alphabet
    Maybe you want to @stream this field ;)
    """
    alphabet: [String!]! @skipAuth
  }
`

```

#### api/src/graphql/auctions.sdl.ts

```ts file="api/src/graphql/auctions.sdl.ts"
// api/src/graphql/auctions.sdl.ts

export const schema = gql`
  type Query {
    auction(id: ID!): Auction @skipAuth
    auctions: [Auction!]! @skipAuth
  }

  type Auction {
    id: ID!
    title: String!
    highestBid: Bid
    bids: [Bid!]!
  }

  type Bid {
    amount: Int!
  }

  type Mutation {
    bid(input: BidInput!): Bid @skipAuth
  }

  input BidInput {
    auctionId: ID!
    amount: Int!
  }
`

```

#### api/src/graphql/fastAndSlowFields.sdl.ts

```ts file="api/src/graphql/fastAndSlowFields.sdl.ts"
export const schema = gql`
  type Query {
    """
    A field that resolves fast.
    """
    fastField: String! @skipAuth

    """
    A field that resolves slowly.
    Maybe you want to @defer this field ;)
    """
    slowField(waitFor: Int! = 5000): String @skipAuth
  }
`

```

#### api/src/graphql/rooms.sdl.ts

```ts file="api/src/graphql/rooms.sdl.ts"
export const schema = gql`
  type Message {
    from: String
    body: String
  }

  type Query {
    room(id: ID!): [Message!]! @skipAuth
    rooms: [ID!]! @skipAuth
  }

  input SendMessageInput {
    roomId: ID!
    from: String!
    body: String!
  }

  type Mutation {
    sendMessage(input: SendMessageInput!): Message! @skipAuth
  }
`

```

#### api/src/graphql/alphabet.sdl.ts

```ts file="api/src/graphql/alphabet.sdl.ts"
export const schema = gql`
  type Query {
    """
    A field that spells out the letters of the alphabet
    Maybe you want to @stream this field ;)
    """
    alphabet: [String!]! @skipAuth
  }
`

```

#### api/src/graphql/auctions.sdl.ts

```ts file="api/src/graphql/auctions.sdl.ts"
// api/src/graphql/auctions.sdl.ts

export const schema = gql`
  type Query {
    auction(id: ID!): Auction @skipAuth
    auctions: [Auction!]! @skipAuth
  }

  type Auction {
    id: ID!
    title: String!
    highestBid: Bid
    bids: [Bid!]!
  }

  type Bid {
    amount: Int!
  }

  type Mutation {
    bid(input: BidInput!): Bid @skipAuth
  }

  input BidInput {
    auctionId: ID!
    amount: Int!
  }
`

```

#### api/src/graphql/fastAndSlowFields.sdl.ts

```ts file="api/src/graphql/fastAndSlowFields.sdl.ts"
export const schema = gql`
  type Query {
    """
    A field that resolves fast.
    """
    fastField: String! @skipAuth

    """
    A field that resolves slowly.
    Maybe you want to @defer this field ;)
    """
    slowField(waitFor: Int! = 5000): String @skipAuth
  }
`

```

#### api/src/graphql/rooms.sdl.ts

```ts file="api/src/graphql/rooms.sdl.ts"
export const schema = gql`
  type Message {
    from: String
    body: String
  }

  type Query {
    room(id: ID!): [Message!]! @skipAuth
    rooms: [ID!]! @skipAuth
  }

  input SendMessageInput {
    roomId: ID!
    from: String!
    body: String!
  }

  type Mutation {
    sendMessage(input: SendMessageInput!): Message! @skipAuth
  }
`

```

### Services

#### api/src/services/alphabet/alphabet.ts

```ts file="api/src/services/alphabet/alphabet.ts"
import { Repeater } from '@redwoodjs/realtime'

import { logger } from 'src/lib/logger'

export const alphabet = async () => {
  return new Repeater<string>(async (push, stop) => {
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')

    const publish = () => {
      const letter = letters.shift()

      if (letter) {
        logger.debug({ letter }, 'publishing letter...')
        push(letter)
      }

      if (letters.length === 0) {
        stop()
      }
    }

    const interval = setInterval(publish, 1000)

    stop.then(() => {
      logger.debug('cancel')
      clearInterval(interval)
    })

    publish()
  })
}

```

#### api/src/services/auctions/auctions.ts

```ts file="api/src/services/auctions/auctions.ts"
// api/src/services/auctions/auctions.ts
import type { LiveQueryStorageMechanism } from '@redwoodjs/realtime'

import { logger } from 'src/lib/logger'

const auctionData = [
  { id: '1', title: 'RedwoodJS Logo Shirt', bids: [{ amount: 20 }] },
  { id: '2', title: 'RedwoodJS Lapel Pin', bids: [{ amount: 5 }] },
  { id: '3', title: 'RedwoodJS Beanie', bids: [{ amount: 15 }] },
  { id: '4', title: 'RedwoodJS Dad Hat', bids: [{ amount: 20 }] },
  { id: '5', title: 'RedwoodJS Skater Hat', bids: [{ amount: 20 }] },
]

export const auctions = () => {
  return auctionData
}

/**
 * To test this live query, run the following in the GraphQL Playground:
 *
 * query GetCurrentAuctionBids @live {
 *  auction(id: "1") {
 *    bids {
 *      amount
 *    }
 *    highestBid {
 *      amount
 *    }
 *    id
 *    title
 *   }
 * }
 *
 * And then make a bid with the following mutation:
 *
 * mutation MakeBid {
 *   bid(input: {auctionId: "1", amount: 10}) {
 *     amount
 *   }
 * }
 */
export const auction = async ({ id }) => {
  const foundAuction = auctionData.find((a) => a.id === id)
  logger.debug({ id, auction: foundAuction }, 'auction')
  return foundAuction
}

export const bid = async (
  { input },
  { context }: { context: { liveQueryStore: LiveQueryStorageMechanism } }
) => {
  const { auctionId, amount } = input

  const index = auctionData.findIndex((a) => a.id === auctionId)

  const bid = { amount }

  auctionData[index].bids.push(bid)
  logger.debug({ auctionId, bid }, 'Added bid to auction')

  const key = `Auction:${auctionId}`
  context.liveQueryStore.invalidate(key)

  logger.debug({ key }, 'Invalidated auction key in liveQueryStore')

  return bid
}

export const Auction = {
  highestBid: (obj, { root }) => {
    const [max] = root.bids.sort((a, b) => b.amount - a.amount)

    logger.debug({ obj, root }, 'highestBid')

    return max
  },
}

```

#### api/src/services/fastAndSlowFields/fastAndSlowFields.ts

```ts file="api/src/services/fastAndSlowFields/fastAndSlowFields.ts"
import { logger } from 'src/lib/logger'

const wait = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time))

export const fastField = async () => {
  return 'I am fast'
}

export const slowField = async (_, { waitFor = 5000 }) => {
  logger.debug('waiting on slowField')
  await wait(waitFor)
  return 'I am slow'
}

```

#### api/src/services/rooms/rooms.ts

```ts file="api/src/services/rooms/rooms.ts"
import type { SendMessageInput } from 'types/graphql'

import { logger } from 'src/lib/logger'
import type { NewMessageChannelType } from 'src/subscriptions/newMessage/newMessage'

export const room = ({ id }) => [id]

export const rooms = () => {
  return [1, 2, 3, 4]
}

export const sendMessage = async (
  { input }: { input: SendMessageInput },
  { context }: { context: { pubSub: NewMessageChannelType } }
) => {
  logger.debug({ input }, 'sending message ....')

  const { roomId, from, body } = input

  context.pubSub.publish('newMessage', roomId, { from, body })

  return input
}

```

### GraphQL -> Directives

#### api/src/directives/requireAuth/requireAuth.test.ts

```ts file="api/src/directives/requireAuth/requireAuth.test.ts"
import { mockRedwoodDirective, getDirectiveName } from '@redwoodjs/testing/api'

import requireAuth from './requireAuth'

describe('requireAuth directive', () => {
  it('declares the directive sdl as schema, with the correct name', () => {
    expect(requireAuth.schema).toBeTruthy()
    expect(getDirectiveName(requireAuth.schema)).toBe('requireAuth')
  })

  it('requireAuth has stub implementation. Should not throw when current user', () => {
    // If you want to set values in context, pass it through e.g.
    // mockRedwoodDirective(requireAuth, { context: { currentUser: { id: 1, name: 'Lebron McGretzky' } }})
    const mockExecution = mockRedwoodDirective(requireAuth, { context: {} })

    expect(mockExecution).not.toThrowError()
  })
})

```

#### api/src/directives/requireAuth/requireAuth.ts

```ts file="api/src/directives/requireAuth/requireAuth.ts"
import gql from 'graphql-tag'

import type { ValidatorDirectiveFunc } from '@redwoodjs/graphql-server'
import { createValidatorDirective } from '@redwoodjs/graphql-server'

import { requireAuth as applicationRequireAuth } from 'src/lib/auth'

export const schema = gql`
  """
  Use to check whether or not a user is authenticated and is associated
  with an optional set of roles.
  """
  directive @requireAuth(roles: [String]) on FIELD_DEFINITION
`

type RequireAuthValidate = ValidatorDirectiveFunc<{ roles?: string[] }>

const validate: RequireAuthValidate = ({ directiveArgs }) => {
  const { roles } = directiveArgs
  applicationRequireAuth({ roles })
}

const requireAuth = createValidatorDirective(schema, validate)

export default requireAuth

```

#### api/src/directives/skipAuth/skipAuth.test.ts

```ts file="api/src/directives/skipAuth/skipAuth.test.ts"
import { getDirectiveName } from '@redwoodjs/testing/api'

import skipAuth from './skipAuth'

describe('skipAuth directive', () => {
  it('declares the directive sdl as schema, with the correct name', () => {
    expect(skipAuth.schema).toBeTruthy()
    expect(getDirectiveName(skipAuth.schema)).toBe('skipAuth')
  })
})

```

#### api/src/directives/skipAuth/skipAuth.ts

```ts file="api/src/directives/skipAuth/skipAuth.ts"
import gql from 'graphql-tag'

import { createValidatorDirective } from '@redwoodjs/graphql-server'

export const schema = gql`
  """
  Use to skip authentication checks and allow public access.
  """
  directive @skipAuth on FIELD_DEFINITION
`

const skipAuth = createValidatorDirective(schema, () => {
  return
})

export default skipAuth

```

### GraphQL -> Subscriptions

#### api/src/subscriptions/countdown/countdown.ts

```ts file="api/src/subscriptions/countdown/countdown.ts"
import gql from 'graphql-tag'

import { Repeater } from '@redwoodjs/realtime'

import { logger } from 'src/lib/logger'

export const schema = gql`
  type Subscription {
    countdown(from: Int!, interval: Int!): Int! @requireAuth
  }
`

/**
 * To test this Countdown subscription, run the following in the GraphQL Playground:
 *
 * subscription CountdownFromInterval {
 *   countdown(from: 100, interval: 10)
 * }
 */
const countdown = {
  countdown: {
    subscribe: (
      _,
      {
        from = 100,
        interval = 10,
      }: {
        from: number
        interval: number
      }
    ) =>
      new Repeater((push, stop) => {
        function decrement() {
          from -= interval

          if (from < 0) {
            logger.debug({ from }, 'stopping as countdown is less than 0')
            stop()
          }

          logger.debug({ from }, 'pushing countdown value ...')
          push(from)
        }

        decrement()

        const delay = setInterval(decrement, 500)

        stop.then(() => {
          clearInterval(delay)
          logger.debug('stopping countdown')
        })
      }),
    resolve: (payload: number) => payload,
  },
}

export default countdown

```

#### api/src/subscriptions/newMessage/newMessage.ts

```ts file="api/src/subscriptions/newMessage/newMessage.ts"
import gql from 'graphql-tag'

import type { PubSub } from '@redwoodjs/realtime'

import { logger } from 'src/lib/logger'

export const schema = gql`
  type Subscription {
    newMessage(roomId: ID!): Message! @requireAuth
  }
`
export type NewMessageChannel = {
  newMessage: [roomId: string, payload: { from: string; body: string }]
}

export type NewMessageChannelType = PubSub<NewMessageChannel>

/**
 * To test this NewMessage subscription, run the following in one GraphQL Playground to subscribe:
 *
 * subscription ListenForNewMessagesInRoom {
 *   newMessage(roomId: "1") {
 *     body
 *     from
 *   }
 * }
 *
 *
 * And run the following in another GraphQL Playground to publish and send a message to the room:
 *
 * mutation SendMessageToRoom {
 *   sendMessage(input: {roomId: "1", from: "hello", body: "bob"}) {
 *     body
 *     from
 *   }
 * }
 */
const newMessage = {
  newMessage: {
    subscribe: (
      _,
      { roomId },
      { pubSub }: { pubSub: NewMessageChannelType }
    ) => {
      logger.debug({ roomId }, 'newMessage subscription')

      return pubSub.subscribe('newMessage', roomId)
    },
    resolve: (payload) => {
      logger.debug({ payload }, 'newMessage subscription resolve')

      return payload
    },
  },
}

export default newMessage

```


## Web

### Routes

#### web/src/Routes.tsx

```tsx file="web/src/Routes.tsx"
// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/alphabet" page={AlphabetPage} name="alphabet" />
      <Route path="/chat-rooms" page={ChatRoomsPage} name="chatRooms" />
      <Route path="/chat/{id:ID}" page={ChatPage} name="chat" />
      <Route path="/auctions" page={AuctionsPage} name="auctions" />
      <Route path="/auction/{id:ID}" page={AuctionPage} name="auction" />
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes

```

### Pages

#### web/src/pages/AlphabetPage/AlphabetPage.tsx

```tsx file="web/src/pages/AlphabetPage/AlphabetPage.tsx"
import { Metadata } from '@redwoodjs/web'

import { StreamProvider, useQuery, g } from 'src/StreamProvider'

const AlphabetQuery = g(`
  query AlphabetQuery {
    alphabet @stream
  }`)

const Alphabet = () => {
  const [{ data, fetching, error }] = useQuery({ query: AlphabetQuery })
  return (
    <>
      <Metadata title="Alphabet" description="Alphabet page" />

      <h1>Alphabet</h1>
      {fetching && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data?.alphabet ? (
        <div className="container mx-auto flex w-1/2 flex-col space-y-4">
          <p>
            <span className="pr-2 font-bold">ABC:</span>
            {data.alphabet}
          </p>

          <div className="h-4 w-full rounded-full bg-gray-200">
            <div
              className="h-4 rounded-full bg-blue-600"
              style={{ width: `${(data.alphabet.length / 26) * 100}%` }}
            ></div>
            <p className="mt-4 text-right">
              {data.alphabet.length == 26
                ? 'Done!'
                : `${26 - data.alphabet.length} to
            go`}
            </p>
          </div>
        </div>
      ) : (
        <p>No data</p>
      )}
    </>
  )
}

// add urql provider
const AlphabetPage = () => (
  <StreamProvider>
    <Alphabet />
  </StreamProvider>
)

export default AlphabetPage

```

#### web/src/pages/AuctionPage/AuctionPage.tsx

```tsx file="web/src/pages/AuctionPage/AuctionPage.tsx"
// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import AuctionCell from 'src/components/AuctionCell'

type props = {
  id: number
}

const AuctionPage = (props: props) => {
  return (
    <>
      <Metadata title="Auction" description="Auction page" />

      <h1>Auction</h1>
      <AuctionCell id={props.id} />
    </>
  )
}

export default AuctionPage

```

#### web/src/pages/AuctionsPage/AuctionsPage.tsx

```tsx file="web/src/pages/AuctionsPage/AuctionsPage.tsx"
import { Metadata } from '@redwoodjs/web'

import AuctionsCell from 'src/components/AuctionsCell'

const AuctionsPage = () => {
  return (
    <>
      <Metadata title="Auctions" description="Auctions page" />

      <h1>Auctions</h1>
      <AuctionsCell />
    </>
  )
}

export default AuctionsPage

```

#### web/src/pages/ChatPage/ChatPage.tsx

```tsx file="web/src/pages/ChatPage/ChatPage.tsx"
import { Metadata } from '@redwoodjs/web'

import ChatRoom from 'src/components/ChatRoom/ChatRoom'

const ChatPage = ({ id }: { id: string }) => {
  return (
    <>
      <Metadata title="Chat" description="Chat page" />
      <h1>Chat room {id}</h1>
      <ChatRoom roomId={id} />
    </>
  )
}

export default ChatPage

```

#### web/src/pages/ChatRoomsPage/ChatRoomsPage.tsx

```tsx file="web/src/pages/ChatRoomsPage/ChatRoomsPage.tsx"
import { Metadata } from '@redwoodjs/web'

import RoomsCell from 'src/components/RoomsCell'

const ChatRoomsPage = () => {
  return (
    <>
      <Metadata title="ChatRooms" description="ChatRooms page" />

      <h1>Chat Rooms</h1>
      <RoomsCell />
    </>
  )
}

export default ChatRoomsPage

```

#### web/src/pages/FatalErrorPage/FatalErrorPage.tsx

```tsx file="web/src/pages/FatalErrorPage/FatalErrorPage.tsx"
// This page will be rendered when an error makes it all the way to the top of the
// application without being handled by a Javascript catch statement or React error
// boundary.
//
// You can modify this page as you wish, but it is important to keep things simple to
// avoid the possibility that it will cause its own error. If it does, Redwood will
// still render a generic error page, but your users will prefer something a bit more
// thoughtful :)

// This import will be automatically removed when building for production
import { DevFatalErrorPage } from '@redwoodjs/web/dist/components/DevFatalErrorPage'

export default DevFatalErrorPage ||
  (() => (
    <main>
      <style
        dangerouslySetInnerHTML={{
          __html: `
              html, body {
                margin: 0;
              }
              html * {
                box-sizing: border-box;
              }
              main {
                display: flex;
                align-items: center;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
                text-align: center;
                background-color: #E2E8F0;
                height: 100vh;
              }
              section {
                background-color: white;
                border-radius: 0.25rem;
                width: 32rem;
                padding: 1rem;
                margin: 0 auto;
                box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
              }
              h1 {
                font-size: 2rem;
                margin: 0;
                font-weight: 500;
                line-height: 1;
                color: #2D3748;
              }
            `,
        }}
      />
      <section>
        <h1>
          <span>Something went wrong</span>
        </h1>
      </section>
    </main>
  ))

```

#### web/src/pages/HomePage/HomePage.tsx

```tsx file="web/src/pages/HomePage/HomePage.tsx"
import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <>
      <Metadata title="Realtime Demo" description="Realtime Demo" />

      <h1 className="text-3xl">Realtime Demo</h1>
      <p>
        <Link to={routes.auctions()}>Auctions</Link>
      </p>
      <p>
        <Link to={routes.chatRooms()}>Chat Rooms</Link>
      </p>
      <p>
        <Link to={routes.alphabet()}>Alphabet</Link>
      </p>
    </>
  )
}

export default HomePage

```

#### web/src/pages/NotFoundPage/NotFoundPage.tsx

```tsx file="web/src/pages/NotFoundPage/NotFoundPage.tsx"
export default () => (
  <main>
    <style
      dangerouslySetInnerHTML={{
        __html: `
              html, body {
                margin: 0;
              }
              html * {
                box-sizing: border-box;
              }
              main {
                display: flex;
                align-items: center;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
                text-align: center;
                background-color: #E2E8F0;
                height: 100vh;
              }
              section {
                background-color: white;
                border-radius: 0.25rem;
                width: 32rem;
                padding: 1rem;
                margin: 0 auto;
                box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
              }
              h1 {
                font-size: 2rem;
                margin: 0;
                font-weight: 500;
                line-height: 1;
                color: #2D3748;
              }
            `,
      }}
    />
    <section>
      <h1>
        <span>404 Page Not Found</span>
      </h1>
    </section>
  </main>
)

```

### Components

#### web/src/components/AuctionCell/Auction.tsx

```tsx file="web/src/components/AuctionCell/Auction.tsx"
import type { Auction, Bid } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

const Auction = ({
  auction,
  summary,
}: {
  auction: Auction
  summary?: boolean
}) => {
  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      <h2 className="text-xl font-bold">{auction.title}</h2>
      {summary ? <BidSummary auction={auction} /> : <Bids auction={auction} />}
    </div>
  )
}

const BidSummary = ({ auction }: { auction: Auction }) => {
  return (
    <>
      <div className="mt-2">
        <Link
          to={routes.auction({ id: auction.id })}
          className="text-blue-500 hover:text-blue-700"
        >
          <span className="font-normal">{auction.bids.length}</span> bids
        </Link>
      </div>
      <div className="text-lg font-semibold">
        {auction.highestBid?.amount} highest
      </div>
    </>
  )
}

const Bids = ({ auction }: { auction: Auction }) => {
  const bids = auction.bids
  return (
    <div className="mt-2 grid grid-cols-1 gap-2">
      {bids.map((bid, i) => (
        <Bid key={`${auction.id}-${bid.amount}-${i}`} bid={bid} />
      ))}
    </div>
  )
}

const Bid = ({ bid }: { bid: Bid }) => {
  return <div className="rounded bg-gray-100 p-2">{bid.amount}</div>
}

export default Auction

```

#### web/src/components/AuctionCell/AuctionCell.tsx

```tsx file="web/src/components/AuctionCell/AuctionCell.tsx"
import type { FindAuctionQuery, FindAuctionQueryVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Auction from './Auction'

export const beforeQuery = (props) => {
  return { variables: props }
}

export const QUERY: TypedDocumentNode<
  FindAuctionQuery,
  FindAuctionQueryVariables
> = gql`
  query FindAuctionQuery($id: ID!) @live {
    auction: auction(id: $id) {
      id
      title
      highestBid {
        amount
      }
      bids {
        amount
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindAuctionQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  auction,
}: CellSuccessProps<FindAuctionQuery, FindAuctionQueryVariables>) => {
  return (
    <>
      <Auction auction={auction} />
    </>
  )
}

```

#### web/src/components/AuctionsCell/AuctionsCell.tsx

```tsx file="web/src/components/AuctionsCell/AuctionsCell.tsx"
import type { AuctionsQuery, AuctionsQueryVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Auction from '../AuctionCell/Auction'

export const QUERY: TypedDocumentNode<
  AuctionsQuery,
  AuctionsQueryVariables
> = gql`
  query AuctionsQuery @live {
    auctions {
      id
      title
      highestBid {
        amount
      }
      bids {
        amount
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ auctions }: CellSuccessProps<AuctionsQuery>) => {
  return (
    <ul className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
      {auctions.map((auction) => {
        return (
          <li key={auction.id} className="rounded bg-gray-100 p-2">
            <Auction auction={auction} summary={true} />
          </li>
        )
      })}
    </ul>
  )
}

```

#### web/src/components/ChatRoom/ChatRoom.tsx

```tsx file="web/src/components/ChatRoom/ChatRoom.tsx"
import { useState, useEffect } from 'react'

import { useSubscription } from '@redwoodjs/web'

import MessageList from 'src/components/MessageList/MessageList'

const LISTEN_FOR_NEW_MESSAGES = gql`
  subscription ListenForNewMessagesInRoom($roomId: ID!) {
    newMessage(roomId: $roomId) {
      body
      from
    }
  }
`

const ChatRoom = ({ roomId }: { roomId: string }) => {
  const [messages, setMessages] = useState<
    Array<{ body: string; from: string }>
  >([])

  const { data, error } = useSubscription(LISTEN_FOR_NEW_MESSAGES, {
    variables: { roomId },
  })

  useEffect(() => {
    if (data?.newMessage) {
      setMessages((prevMessages) => [data.newMessage, ...prevMessages])
    }
  }, [data])

  if (error) return <p>Error: {error.message}</p>

  return <MessageList messages={messages} />
}

export default ChatRoom

```

#### web/src/components/MessageList/MessageList.tsx

```tsx file="web/src/components/MessageList/MessageList.tsx"
type Message = {
  body: string
  from: string
}

const MessageList = ({ messages }: { messages: Message[] }) => {
  return (
    <ul className="space-y-4">
      {messages.map((message, index) => (
        <li key={index} className="rounded-lg bg-gray-100 p-4 shadow-sm">
          <p className="font-semibold text-gray-800">{message.from}</p>
          <p className="mt-1 text-gray-600">{message.body}</p>
        </li>
      ))}
    </ul>
  )
}

export default MessageList

```

#### web/src/components/RoomsCell/RoomsCell.tsx

```tsx file="web/src/components/RoomsCell/RoomsCell.tsx"
import type { RoomsQuery, RoomsQueryVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

export const QUERY: TypedDocumentNode<RoomsQuery, RoomsQueryVariables> = gql`
  query RoomsQuery {
    rooms
  }
`

import ChatRoom from 'src/components/ChatRoom/ChatRoom'

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ rooms }: CellSuccessProps<RoomsQuery>) => {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {rooms.map((roomId) => {
        return (
          <div key={roomId} className="rounded-lg bg-white">
            <h2 className="text-center text-2xl font-bold">
              <Link
                to={routes.chat({ id: roomId })}
                className="mt-2 block text-center text-blue-600 hover:text-blue-800"
              >
                Room {roomId}
              </Link>
            </h2>
            <ChatRoom roomId={roomId} />
          </div>
        )
      })}
    </div>
  )
}

```

### App

#### web/src/App.tsx

```tsx file="web/src/App.tsx"
import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './index.css'

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <RedwoodApolloProvider>
        <Routes />
      </RedwoodApolloProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App

```
