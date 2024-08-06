#  Redwood Copilot Demo - Codebase Table of Contents

## Readme

#### README.md

```md file="README.md"
# Redwood Copilot Demo
## with OpenAI and GraphQL Streaming

This project demonstrates how to use RedwoodJS, OpenAI and GraphQL Streaming to build a Chatbot that can answer questions about your code.

### Codebase Generator
First we generate a file with your entire RedwoodJS project.

### AI
We provide that codebase to OpenAI, OpenAI with Unkey Semantic Cache, or Langbase and ask questions about it using our Redwood Copilot chatbot.

### GraphQL Streaming
Redwood Realtime with GraphQL Streaming will stream the response from OpenAI to the client.

# AI Chat

We demo:

* [OpenAI](https://openai.com)
* OpenAI with [Unkey](https://www.unkey.com) [Semantic Cache](https://www.unkey.com/docs/semantic-cache/introduction)
* [Langbase](https://langbase.com/)

Each use the `gpt-4o-mini` model.

## About Langbase

⌘ Langbase helps developers ship composable hyper-personalized AI apps and features.

Start by building AI assistants Pipes
Then create managed semantic memory (RAG) so your AI can talk to your data

⌘ Langbase is the composable infrastructure and developer experience to build, collaborate, and deploy any AI apps/features. Our mission is to make AI accessible to everyone, any developer not just AI/ML experts. We are the only composable AI infrastructure.

### Langbase Demo

The Langbase powered chat uses a [Pipe](https://langbase.com/docs/pipe/overview) with the project codebase attached as memory.

This codebase is uploaded to [memory](https://langbase.com/docs/memory/overview) via script or can be initiated by a GraphQL mutation.

We can also upload all the RedwoodJS documentation to Langbase memory so one can chat with your code as well as docs.

The pipe defines the:

* prompt
* model
* settings
* RAG instructions

By using a [pipe](https://langbase.com/docs/pipe/overview), the model used and prompt can be adjusted without modifying the request.

## About Unkey Sematic Cache

A simple way to improve performance when using LLMs is to cache responses using the user query as the key. This has the disadvantage of only allowing for caching of exact matches.

A more useful form of caching is [semantic caching](https://www.unkey.com/docs/semantic-cache/introduction): caching based on the embedding of the query, and returning a response if the query passes a threshold of semantic similarity. This allows for a higher cache hit rate, meaning faster responses for your users and reduced OpenAI bills.

### Semantic Cache Demo

To enable semantic caching with Unkey we:

* Set up a new gateway in the dashboard
* Created a second OpenAI client and replaced the baseURL with the new gateway URL

Subsequent responses will be cached. You can monitor the cache via our dashboard.

Unkey’s semantic cache supports streaming, making it useful for web-based chat applications where you want to display results in real-time.

# How To

## Config

You will need to following envars:

```
OPENAI_API_KEY=

LANGBASE_PIPE_API_KEY=
LANGBASE_API_KEY=
LANGBASE_MEMORY_NAME_CODEBASE=
LANGBASE_MEMORY_NAME_DOCS=
LANGBASE_OWNER_LOGIN=

UNKEY_SEMANTIC_CACHE_GATEWAY=

REDWOOD_DOCS_PATH="/your/path/to/redwoodjs/redwood/docs/docs"

```

## Scripts

* `yarn rw exec gen-codebase` - generates codebase file `CODEBASE_TOC.md`
* `yarn rw exec gen-codebase --upload=true` uploads to Langbase; needs `LANGBASE_MEMORY_NAME_CODEBASE`
* `yarn rw exec gen-docs` fetches docs from a local RedwoodJS folder uploads docs to Langbase; keeps hash to upload only docs changed since last upload. needs `LANGBASE_MEMORY_NAME_DOCS`



## Future

* Use RAG with RedwoodJS docs + AI assistant prompt to answer more questions.

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
  title = "Redwood Copilot Demo"
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
[experimental]
  useSDLCodeGenForGraphQLTypes = true

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

input ChatInput {
  debug: Boolean = false
  prompt: String!
  provider: ChatProvider = OPENAI
}

enum ChatProvider {
  LANGBASE
  OPENAI
  OPENAI_WITH_UNKEY_CACHE
}

type ChatResponse {
  id: ID!
  message: String!
  prompt: String!
}

input CreatePostInput {
  author: String!
  body: String
  title: String!
}

scalar Date

scalar DateTime

input GenCodebaseInput {
  upload: Boolean = false
}

scalar JSON

scalar JSONObject

type Message {
  body: String
  from: String
}

type Mutation {
  bid(input: BidInput!): Bid
  createPost(input: CreatePostInput!): Post!
  deletePost(id: Int!): Post!
  generateCodebase(args: GenCodebaseInput): Boolean
  sendMessage(input: SendMessageInput!): Message!
  updatePost(id: Int!, input: UpdatePostInput!): Post!
}

type Post {
  author: String!
  body: String
  createdAt: DateTime!
  id: Int!
  title: String!
  updatedAt: DateTime!
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
  chat(input: ChatInput!): [ChatResponse!]!
  codebase: String

  """A field that resolves fast."""
  fastField: String!
  loadFile(path: String): String
  post(id: Int!): Post
  posts: [Post!]!

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

input UpdatePostInput {
  author: String
  body: String
  title: String
}
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

model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title     String   @unique
  body      String?
  author    String
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

#### api/src/lib/id.ts

```ts file="api/src/lib/id.ts"
import { customAlphabet } from 'nanoid'

/** Custom nanoid function with a specific alphabet */
export const nanoid = customAlphabet(
  '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
)

/** Object containing prefixes for different entity types */
const prefixes = {
  bucket: 'chat_completion',
  test: 'test', // <-- for tests only
} as const

/** Options for creating a new identifier */
type NewIdentifierOptions = {
  /** Whether to include a timestamp in the identifier to help with sorting */
  includeTimestamp?: boolean
}

/**
 * Generates a new unique identifier
 * @param prefix - The prefix for the identifier
 * @param options - Options for generating the identifier
 * @returns A string containing the new unique identifier
 */
export const newId = (
  prefix: keyof typeof prefixes,
  options?: NewIdentifierOptions
): string => {
  const includeTimestamp = options?.includeTimestamp ?? true
  const now = process.hrtime.bigint()
  const timestamp = includeTimestamp ? String(now) : ''
  return [prefixes[prefix], timestamp, nanoid(12)].join('_')
}

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

#### api/src/lib/chat/ChatRepeater.ts

```ts file="api/src/lib/chat/ChatRepeater.ts"
import { Repeater } from '@redwoodjs/realtime'

import { logger } from 'src/lib/logger'

import {
  debugChatResponse,
  emptyPromptChatResponse,
  errorChatResponse,
} from './responses'

export const ChatRepeater = async ({
  promptFunction,
  prompt,
  debug,
  buildChatResponseFunction,
}) => {
  if (!prompt || prompt.trim() === '') {
    return emptyPromptChatResponse(prompt)
  }

  if (debug) {
    return debugChatResponse(prompt)
  }
  return new Repeater<ReturnType<typeof buildChatResponseFunction>>(
    async (push, stop) => {
      const publish = async () => {
        try {
          logger.debug('>> stream requested ...')

          const stream = await promptFunction(prompt)

          logger.debug('>> stream received started ...')

          for await (const part of stream) {
            const { content } = part.choices[0].delta

            if (content) {
              logger.debug({ content }, '>> stream received ...')
              const chatResponse = buildChatResponseFunction(
                part,
                content,
                prompt
              )
              console.debug(chatResponse, 'Publish chat chunk')
              push(chatResponse)
            }
          }

          logger.debug('>> stream received ended.')

          stop()
        } catch (error) {
          logger.error(error, 'Error in >> stream:')
          return errorChatResponse(prompt)
        }
      }

      publish()

      await stop.then(() => {
        logger.debug('stream done')
      })
    }
  )
}

```

#### api/src/lib/chat/responses.ts

```ts file="api/src/lib/chat/responses.ts"
import type { ChatResponse } from 'types/shared-schema-types'

import { Repeater } from '@redwoodjs/realtime'

import { logger } from 'src/lib/logger'

const DEFAULT_DELAY_SECONDS = 200

const simulateChatResponseStream = (
  prompt = '',
  messages: string[],
  delay: number = DEFAULT_DELAY_SECONDS,
  initialDelay = 0
) => {
  return new Repeater<ChatResponse>(async (push, stop) => {
    await new Promise((resolve) => setTimeout(resolve, initialDelay))
    for (const message of messages) {
      logger.debug({ message, prompt }, 'debug mode message')
      await push({ id: '1', message, prompt })
      logger.debug(`Delaying for ${delay}ms`)
      await new Promise((resolve) => setTimeout(resolve, delay))
      logger.debug('Delay complete')
    }

    logger.debug('All messages sent')
    stop()
  })
}

export const debugChatResponse = (prompt: string) => {
  logger.debug({ prompt }, 'debug mode prompt')

  return simulateChatResponseStream(
    prompt,
    ['Hello ', 'world!', '\n', 'This is ', 'a debug ', 'session'],
    DEFAULT_DELAY_SECONDS,
    2_250
  )
}

export const emptyPromptChatResponse = (prompt: string) => {
  logger.warn('prompt is empty')
  const messages = ['Did you ', 'mean to ask ', 'something?']
  return simulateChatResponseStream(prompt, messages)
}

export const errorChatResponse = (prompt: string) => {
  logger.error('error')
  return simulateChatResponseStream(prompt, [
    'Oops ',
    'something went ',
    'wrong!',
  ])
}

```

#### api/src/lib/codebaseGenerator/codebase.ts

```ts file="api/src/lib/codebaseGenerator/codebase.ts"
import fs from 'fs'
import path from 'path'

import { getPaths } from '@redwoodjs/internal'

import { logger } from 'src/lib/logger'

export const CODEBASE = 'CODEBASE_TOC.md'

export const readCodebaseFile = (filePathToRead?: string) => {
  const paths = getPaths()
  const filePath = path.join(paths.base, filePathToRead || CODEBASE)
  logger.debug({ filePath }, 'Reading file')
  return fs.readFileSync(filePath, 'utf-8')
}

```

#### api/src/lib/codebaseGenerator/codebaseGenerator.ts

```ts file="api/src/lib/codebaseGenerator/codebaseGenerator.ts"
import * as fs from 'fs'
import * as path from 'path'

import fg from 'fast-glob'
import type { GenCodebaseInput } from 'types/shared-schema-types'

import { getConfig, getPaths } from '@redwoodjs/project-config'

import { getSignedUploadUrl, uploadDocument } from 'src/lib/langbase'
import { logger } from 'src/lib/logger'

const CODEBASE_FILENAME = path.join(
  getPaths().base,
  '.rw-chatbot',
  'CODEBASE_TOC.md'
)

const getRedwoodAppTitle = (): string => {
  const config = getConfig()
  return config.web.title ?? 'Redwood App'
}

const getCodeFiles = async (): Promise<string[]> => {
  const paths = getPaths()

  const rwFiles = fg.globSync(['redwood.toml', 'README.md'])
  const dbFiles = fg.globSync(`${paths.api.db}/**/*.prisma`)
  const graphQLFiles = fg.globSync([
    `${paths.generated.schema}`,
    `${paths.api.graphql}/**/*.{ts,js}`,
  ])
  const apiFiles = fg.globSync(`${paths.api.src}/**/*.{ts,js,tsx,jsx}`)
  const webFiles = fg.globSync(`${paths.web.src}/**/*.{ts,js,tsx,jsx}`)
  return [...rwFiles, ...dbFiles, ...graphQLFiles, ...apiFiles, ...webFiles]
}

const createMarkdownTOC = (files: string[]): string => {
  const appTitle = getRedwoodAppTitle()
  const toc = [`#  ${appTitle} - Codebase Table of Contents`]
  const paths = getPaths()
  const sections = {
    'README.md': '## Readme',
    'redwood.toml': '## Redwood Config',
    API: {
      [paths.generated.schema]: '### GraphQL Schema',
      [paths.api.db]: '### DB',
      [paths.api.src + '/server.ts']: '### Server',
      [paths.api.src + '/lib']: '### Lib',
      [paths.api.src + '/graphql']: '### GraphQL',
      [paths.api.src + '/services']: '### Services',
      [paths.api.src + '/directives']: '### GraphQL -> Directives',
      [paths.api.src + '/subscriptions']: '### GraphQL -> Subscriptions',
    },
    Web: {
      [paths.web.src + '/Routes.tsx']: '### Routes',
      [paths.web.src + '/layouts']: '### Layouts',
      [paths.web.src + '/pages']: '### Pages',
      [paths.web.src + '/components']: '### Components',
      [paths.web.src + '/App.tsx']: '### App',
      [paths.web.src + '/StreamProvider.tsx']: '### Stream Provider',
      [paths.web.src + '/urql.ts']: '### Urql GraphQL Client',
    },
  }

  for (const [section, content] of Object.entries(sections)) {
    if (typeof content === 'string') {
      toc.push(`\n${content}\n`)
      const sectionFiles = files.filter((file) => file === section)
      addFilesToTOC(sectionFiles, toc)
    } else {
      toc.push(`\n## ${section}\n`)
      for (const [dir, heading] of Object.entries(content)) {
        const sectionFiles = files.filter((file) => file.startsWith(dir))
        if (sectionFiles.length > 0) {
          toc.push(`${heading}\n`)
          addFilesToTOC(sectionFiles, toc)
        }
      }
    }
  }

  return toc.join('\n')
}

const addFilesToTOC = (sectionFiles: string[], toc: string[]) => {
  const paths = getPaths()
  sectionFiles.forEach((file) => {
    const relativePath = file.replace(paths.base + '/', '')
    // logger.debug(`Adding ${relativePath} to TOC`)
    toc.push(`#### ${relativePath}\n`)
    const content = fs.readFileSync(file, 'utf-8')
    const fileExtension = file.split('.').pop()
    toc.push(
      `\`\`\`${fileExtension} file="${relativePath}"\n${content}\n\`\`\`\n`
    )
  })
}

export const generate = async (args?: GenCodebaseInput) => {
  logger.info(':: Generating codebase table of contents ::')

  const files = await getCodeFiles()
  const tocContent = createMarkdownTOC(files)
  const fileName = CODEBASE_FILENAME
  fs.writeFileSync(fileName, tocContent)

  if (args?.upload) {
    const { signedUrl } = await getSignedUploadUrl({
      fileName,
      memory: process.env.LANGBASE_MEMORY_NAME_CODEBASE,
    })

    if (signedUrl) {
      logger.info(':: Uploading table of contents to Langbase ::')
      await uploadDocument({
        signedUrl,
        filePath: fileName,
        contentType: 'text/markdown',
      })
    } else {
      logger.error(
        ':: Failed to get signed URL for uploading table of contents to Langbase ::'
      )
    }
  }

  return true
}

```

#### api/src/lib/documentationGenerator/documentationGenerator.ts

```ts file="api/src/lib/documentationGenerator/documentationGenerator.ts"
import crypto from 'crypto'
import fs from 'fs'
import path from 'path'

import fg from 'fast-glob'

import { getPaths } from '@redwoodjs/project-config'

import { getSignedUploadUrl, uploadDocument } from 'src/lib/langbase'
import { logger } from 'src/lib/logger'

const HASH_FILE = path.join(getPaths().base, '.rw-chatbot', 'doc_hashes.json')

const generateDocumentHash = (filePath: string): string => {
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  return crypto.createHash('md5').update(fileContent).digest('hex')
}

export const generateDocumentation = async () => {
  const docsPath = process.env.REDWOOD_DOCS_PATH
  logger.info({ docsPath }, 'Generating documentation')

  // Load existing hashes
  let existingHashes = {}
  try {
    const hashContent = fs.readFileSync(HASH_FILE, 'utf-8')
    existingHashes = JSON.parse(hashContent)
  } catch (error) {
    logger.info('No existing hash file found. Creating a new one.')
  }

  // Find all markdown files
  const filepaths = await fg(['**/*.md', '**/*.mdx'], { cwd: `${docsPath}` })

  // Process each file
  for (const filepath of filepaths) {
    const name = filepath.split('/').join('-')
    const fullPath = path.join(docsPath, filepath)

    // Calculate hash of file contents
    const hash = generateDocumentHash(fullPath)

    if (existingHashes[name] !== hash) {
      logger.info({ name, filepath: fullPath }, 'File changed, uploading')

      const signedUrlResponse = await getSignedUploadUrl({
        fileName: name,
        memory: process.env.LANGBASE_MEMORY_NAME_DOCS,
      })
      const signedUrl = signedUrlResponse.signedUrl

      const response = await uploadDocument({
        signedUrl,
        filePath: fullPath,
        contentType: 'text/markdown',
      })
      logger.info({ response, name, path: fullPath }, 'Uploaded file')

      // Update hash immediately after successful upload
      existingHashes[name] = hash
      fs.writeFileSync(HASH_FILE, JSON.stringify(existingHashes, null, 2))
      logger.info({ name }, 'Updated hash after successful upload')
    } else {
      logger.info({ name, filepath: fullPath }, 'File unchanged, skipping')
    }
  }

  logger.info(':: Documentation generation and upload complete ::')
}

```

#### api/src/lib/langbase/langbase.ts

```ts file="api/src/lib/langbase/langbase.ts"
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

```

#### api/src/lib/openAI/openAI.ts

```ts file="api/src/lib/openAI/openAI.ts"
import OpenAI from 'openai'

// Uses standard OpenAI API
export const openAIClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Uses Unkey semantic cache gateway to cache responses from OpenAI
// https://unkey.io/docs/semantic-cache
// using the baseURL: https://auxiliary-solid-state-tennessine-4901.llm.unkey.io
export const openAIClientWithUnkeyCache = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.UNKEY_SEMANTIC_CACHE_GATEWAY,
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

export const streamWithUnkeyCache = (prompt: string) =>
  openAIClientWithUnkeyCache.chat.completions.create({
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

#### api/src/graphql/chat.sdl.ts

```ts file="api/src/graphql/chat.sdl.ts"
export const schema = gql`
  type ChatResponse {
    id: ID!
    prompt: String!
    message: String!
  }

  type Query {
    chat(input: ChatInput!): [ChatResponse!]! @skipAuth
  }

  enum ChatProvider {
    OPENAI
    OPENAI_WITH_UNKEY_CACHE
    LANGBASE
  }

  input ChatInput {
    prompt: String!
    provider: ChatProvider = OPENAI
    debug: Boolean = false
  }
`

```

#### api/src/graphql/codebaseGenerator.sdl.ts

```ts file="api/src/graphql/codebaseGenerator.sdl.ts"
export const schema = gql`
  input GenCodebaseInput {
    upload: Boolean = false
  }

  type Mutation {
    generateCodebase(args: GenCodebaseInput): Boolean @skipAuth
  }
  type Query {
    codebase: String @skipAuth
    loadFile(path: String): String @skipAuth
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

#### api/src/graphql/posts.sdl.ts

```ts file="api/src/graphql/posts.sdl.ts"
export const schema = gql`
  type Post {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    title: String!
    body: String
    author: String!
  }

  type Query {
    posts: [Post!]! @requireAuth
    post(id: Int!): Post @requireAuth
  }

  input CreatePostInput {
    title: String!
    body: String
    author: String!
  }

  input UpdatePostInput {
    title: String
    body: String
    author: String
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post! @requireAuth
    updatePost(id: Int!, input: UpdatePostInput!): Post! @requireAuth
    deletePost(id: Int!): Post! @requireAuth
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

#### api/src/graphql/chat.sdl.ts

```ts file="api/src/graphql/chat.sdl.ts"
export const schema = gql`
  type ChatResponse {
    id: ID!
    prompt: String!
    message: String!
  }

  type Query {
    chat(input: ChatInput!): [ChatResponse!]! @skipAuth
  }

  enum ChatProvider {
    OPENAI
    OPENAI_WITH_UNKEY_CACHE
    LANGBASE
  }

  input ChatInput {
    prompt: String!
    provider: ChatProvider = OPENAI
    debug: Boolean = false
  }
`

```

#### api/src/graphql/codebaseGenerator.sdl.ts

```ts file="api/src/graphql/codebaseGenerator.sdl.ts"
export const schema = gql`
  input GenCodebaseInput {
    upload: Boolean = false
  }

  type Mutation {
    generateCodebase(args: GenCodebaseInput): Boolean @skipAuth
  }
  type Query {
    codebase: String @skipAuth
    loadFile(path: String): String @skipAuth
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

#### api/src/graphql/posts.sdl.ts

```ts file="api/src/graphql/posts.sdl.ts"
export const schema = gql`
  type Post {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    title: String!
    body: String
    author: String!
  }

  type Query {
    posts: [Post!]! @requireAuth
    post(id: Int!): Post @requireAuth
  }

  input CreatePostInput {
    title: String!
    body: String
    author: String!
  }

  input UpdatePostInput {
    title: String
    body: String
    author: String
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post! @requireAuth
    updatePost(id: Int!, input: UpdatePostInput!): Post! @requireAuth
    deletePost(id: Int!): Post! @requireAuth
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

    const interval = setInterval(publish, 250)

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

#### api/src/services/chat/chat.ts

```ts file="api/src/services/chat/chat.ts"
import { ChatResponse } from 'types/shared-schema-types'

import { ChatRepeater } from 'src/lib/chat/ChatRepeater'
import { stream as langbaseStream } from 'src/lib/langbase/langbase'
import { logger } from 'src/lib/logger'
import { stream as openAIStream } from 'src/lib/openAI/openAI'
import { streamWithUnkeyCache as openAIStreamWithUnkeyCache } from 'src/lib/openAI/openAI'
interface ChatResponseFunction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (part: any, content: string, prompt: string): ChatResponse
}

const buildChatResponseFunction: ChatResponseFunction = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  part: any,
  content: string,
  prompt: string
): ChatResponse => {
  return {
    id: part.id,
    message: content,
    prompt,
  }
}

export const chat = async ({ input }) => {
  const { prompt, debug, provider } = input

  logger.debug('prompt', prompt)

  const promptFunction =
    provider === 'OPENAI'
      ? openAIStream
      : provider === 'OPENAI_WITH_UNKEY_CACHE'
      ? openAIStreamWithUnkeyCache
      : langbaseStream

  return ChatRepeater({
    promptFunction,
    prompt,
    debug,
    buildChatResponseFunction,
  })
}

```

#### api/src/services/codebase/codebase.ts

```ts file="api/src/services/codebase/codebase.ts"
import type {
  LoadFileResolver,
  GenerateCodebaseResolver,
  CodebaseResolver,
} from 'types/codebase'
import type { GenCodebaseInput } from 'types/shared-schema-types'

import { readCodebaseFile } from 'src/lib/codebaseGenerator/codebase'
import { generate } from 'src/lib/codebaseGenerator/codebaseGenerator'

export const generateCodebase: GenerateCodebaseResolver = async ({
  args,
}: {
  args: GenCodebaseInput
}) => {
  return await generate(args)
}

export const codebase: CodebaseResolver = async () => {
  return await readCodebaseFile()
}

export const loadFile: LoadFileResolver = async ({ path }) => {
  return await readCodebaseFile(path)
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

#### api/src/services/posts/posts.ts

```ts file="api/src/services/posts/posts.ts"
import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const posts: QueryResolvers['posts'] = () => {
  return db.post.findMany()
}

export const post: QueryResolvers['post'] = ({ id }) => {
  return db.post.findUnique({
    where: { id },
  })
}

export const createPost: MutationResolvers['createPost'] = ({ input }) => {
  return db.post.create({
    data: input,
  })
}

export const updatePost: MutationResolvers['updatePost'] = ({ id, input }) => {
  return db.post.update({
    data: input,
    where: { id },
  })
}

export const deletePost: MutationResolvers['deletePost'] = ({ id }) => {
  return db.post.delete({
    where: { id },
  })
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

import { Router, Route, Set } from '@redwoodjs/router'

import RedwoodCopilotLayout from 'src/layouts/RedwoodCopilotLayout/RedwoodCopilotLayout'
import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={RedwoodCopilotLayout}>
        <Route path="/view-file" page={ViewFilePage} name="viewFile" />
        <Route path="/redwood-copilot" page={RedwoodCopilotPage} name="redwoodCopilot" />
        <Route path="/alphabet" page={AlphabetPage} name="alphabet" />
        <Route path="/chat-rooms" page={ChatRoomsPage} name="chatRooms" />
        <Route path="/chat/{id:ID}" page={ChatPage} name="chat" />
        <Route path="/auctions" page={AuctionsPage} name="auctions" />
        <Route path="/auction/{id:ID}" page={AuctionPage} name="auction" />
        <Route path="/" page={HomePage} name="home" />
        <Set wrap={ScaffoldLayout} title="Posts" titleTo="posts" buttonLabel="New Post" buttonTo="newPost">
          <Route path="/posts/new" page={PostNewPostPage} name="newPost" />
          <Route path="/posts/{id:Int}/edit" page={PostEditPostPage} name="editPost" />
          <Route path="/posts/{id:Int}" page={PostPostPage} name="post" />
          <Route path="/posts" page={PostPostsPage} name="posts" />
        </Set>
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes

```

### Layouts

#### web/src/layouts/RedwoodCopilotLayout/RedwoodCopilotLayout.tsx

```tsx file="web/src/layouts/RedwoodCopilotLayout/RedwoodCopilotLayout.tsx"
import RedwoodCopilotDrawer from 'src/components/RedwoodCopilot/Drawer'

type RedwoodCopilotLayoutProps = {
  children?: React.ReactNode
}

const RedwoodCopilotLayout = ({ children }: RedwoodCopilotLayoutProps) => {
  return (
    <>
      <RedwoodCopilotDrawer open={false} />
      {children}
    </>
  )
}

export default RedwoodCopilotLayout

```

#### web/src/layouts/ScaffoldLayout/ScaffoldLayout.tsx

```tsx file="web/src/layouts/ScaffoldLayout/ScaffoldLayout.tsx"
import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type LayoutProps = {
  title: string
  titleTo: string
  buttonLabel: string
  buttonTo: string
  children: React.ReactNode
}

const ScaffoldLayout = ({
  title,
  titleTo,
  buttonLabel,
  buttonTo,
  children,
}: LayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes[titleTo]()} className="rw-link">
            {title}
          </Link>
        </h1>
        <Link to={routes[buttonTo]()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> {buttonLabel}
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default ScaffoldLayout

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
import {
  BoltIcon,
  CodeBracketIcon,
  SparklesIcon,
} from '@heroicons/react/20/solid'

import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import CodebaseCell from 'src/components/CodebaseCell'

const headings = [
  {
    name: 'Codebase Generator',
    description: 'First we generate a file with your entire RedwoodJS project.',
    path: 'api/src/lib/codebaseGenerator/codebaseGenerator.ts',
    icon: CodeBracketIcon,
  },
  {
    name: 'AI Chat',
    description:
      'We provide that codebase to OpenAI, OpenAI with Unkey Semantic Cache, or Langbase and ask questions about it using our Redwood Copilot chatbot.',
    path: 'api/src/services/chat/chat.ts',
    icon: SparklesIcon,
  },
  {
    name: 'GraphQL Streaming',
    description:
      'Redwood Realtime with GraphQL Streaming will stream the response from OpenAI to the client.',
    path: 'api/src/lib/chat/ChatRepeater.ts',

    icon: BoltIcon,
  },
]

function HeadingCards() {
  return (
    <div className="bg-white py-12 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className=" text-base font-semibold leading-7 text-green-600">
            Chatbot
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Redwood Copilot Demo
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            with AI Chat and GraphQL Streaming
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            This project demonstrates how to use RedwoodJS, AI and GraphQL
            Streaming to build a Chatbot that can answer questions about your
            code.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {headings.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon
                    aria-hidden="true"
                    className="h-5 w-5 flex-none text-green-600"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    <Link
                      to={routes.viewFile({ path: feature.path })}
                      className="text-sm font-semibold leading-6 text-green-600"
                    >
                      Look at the code <span aria-hidden="true">→</span>
                    </Link>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

const HomePage = () => {
  return (
    <>
      <Metadata
        title="Redwood Copiliot Demo with OpenAI and GraphQL Streaming"
        description="Redwood Copiliot Demo with OpenAI and GraphQL Streaming"
      />

      <HeadingCards />
      <div className="mx-auto rounded-md border border-green-300 bg-green-100 p-4 lg:w-2/3">
        <CodebaseCell />
      </div>
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

#### web/src/pages/RedwoodCopilotPage/RedwoodCopilotPage.tsx

```tsx file="web/src/pages/RedwoodCopilotPage/RedwoodCopilotPage.tsx"
export default function RedwoodCopilotPage() {
  return <>My page</>
}

```

#### web/src/pages/ViewFilePage/ViewFilePage.tsx

```tsx file="web/src/pages/ViewFilePage/ViewFilePage.tsx"
import { BackwardIcon } from '@heroicons/react/24/outline'

import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import LoadFileCell from 'src/components/LoadFileCell'

type ViewFilePageProps = {
  path: string
}

const ViewFilePage = ({ path }: ViewFilePageProps) => {
  return (
    <div className="container mx-auto mt-12 w-full">
      <Metadata title="ViewFile" description="ViewFile page" />
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold">
          <Link to={routes.home()}>
            <BackwardIcon className="mr-6 inline-block h-6 w-6" />
          </Link>
          View File
        </h1>

        <p className="text-lg font-bold text-gray-800">{path}</p>
        <LoadFileCell path={path} />
      </div>
    </div>
  )
}

export default ViewFilePage

```

#### web/src/pages/Post/EditPostPage/EditPostPage.tsx

```tsx file="web/src/pages/Post/EditPostPage/EditPostPage.tsx"
import EditPostCell from 'src/components/Post/EditPostCell'

type PostPageProps = {
  id: number
}

const EditPostPage = ({ id }: PostPageProps) => {
  return <EditPostCell id={id} />
}

export default EditPostPage

```

#### web/src/pages/Post/NewPostPage/NewPostPage.tsx

```tsx file="web/src/pages/Post/NewPostPage/NewPostPage.tsx"
import NewPost from 'src/components/Post/NewPost'

const NewPostPage = () => {
  return <NewPost />
}

export default NewPostPage

```

#### web/src/pages/Post/PostPage/PostPage.tsx

```tsx file="web/src/pages/Post/PostPage/PostPage.tsx"
import PostCell from 'src/components/Post/PostCell'

type PostPageProps = {
  id: number
}

const PostPage = ({ id }: PostPageProps) => {
  return <PostCell id={id} />
}

export default PostPage

```

#### web/src/pages/Post/PostsPage/PostsPage.tsx

```tsx file="web/src/pages/Post/PostsPage/PostsPage.tsx"
import PostsCell from 'src/components/Post/PostsCell'

const PostsPage = () => {
  return <PostsCell />
}

export default PostsPage

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

#### web/src/components/CodebaseCell/CodebaseCell.tsx

```tsx file="web/src/components/CodebaseCell/CodebaseCell.tsx"
import type {
  FindCodebaseQuery,
  FindCodebaseQueryVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Markdown from 'src/components/Markdown/Markdown'

export const QUERY: TypedDocumentNode<
  FindCodebaseQuery,
  FindCodebaseQueryVariables
> = gql`
  query FindCodebaseQuery {
    codebase
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindCodebaseQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  codebase,
}: CellSuccessProps<FindCodebaseQuery, FindCodebaseQueryVariables>) => {
  return <Markdown>{codebase}</Markdown>
}

```

#### web/src/components/LoadFileCell/LoadFileCell.tsx

```tsx file="web/src/components/LoadFileCell/LoadFileCell.tsx"
import type {
  FindLoadFileQuery,
  FindLoadFileQueryVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Markdown from 'src/components/Markdown'

export const QUERY: TypedDocumentNode<
  FindLoadFileQuery,
  FindLoadFileQueryVariables
> = gql`
  query FindLoadFileQuery($path: String!) {
    loadFile(path: $path)
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindLoadFileQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  loadFile,
}: CellSuccessProps<FindLoadFileQuery, FindLoadFileQueryVariables>) => {
  return (
    <div className="mx-auto rounded-md border border-green-300 bg-green-100 p-4 lg:w-2/3">
      <Markdown>{`\`\`\`ts ${loadFile}\`\`\``}</Markdown>
    </div>
  )
}

```

#### web/src/components/Markdown/Markdown.tsx

```tsx file="web/src/components/Markdown/Markdown.tsx"
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

const CodeBlock = ({ className, children }) => {
  const match = /language-(\w+)/.exec(className || '')
  return match ? (
    <SyntaxHighlighter language={match[1]} PreTag="div">
      {String(children)}
    </SyntaxHighlighter>
  ) : (
    <code className={`${className} whitespace-pre-wrap`}>{children}</code>
  )
}

const Markdown = ({ children }) => {
  return (
    <ReactMarkdown components={{ code: CodeBlock }}>{children}</ReactMarkdown>
  )
}

export default Markdown

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

#### web/src/components/RedwoodCopilot/ChatForm.tsx

```tsx file="web/src/components/RedwoodCopilot/ChatForm.tsx"
import React from 'react'

import avatar from './avatars/rw-copilot-avatar.png'

interface ChatFormProps {
  prompt: string
  setPrompt: (prompt: string) => void
  provider: string
  setProvider: (provider: string) => void
  handleSend: () => void
  fetching: boolean
}

const ChatForm: React.FC<ChatFormProps> = ({
  prompt,
  setPrompt,
  provider,
  setProvider,
  handleSend,
  fetching,
}) => {
  return (
    <div className="sticky bottom-0 mb-0 w-full bg-white px-4 pt-8">
      <div className="flex gap-2">
        <input
          type="text"
          name="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
          placeholder="Ask me anything about your RedwoodJS project"
          required
          disabled={fetching}
          className="flex-grow rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <select
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          className="rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="OPENAI">OpenAI</option>
          <option value="OPENAI_WITH_UNKEY_CACHE">OpenAI Cached</option>
          <option value="LANGBASE">Langbase</option>
        </select>

        <button
          type="button"
          className="inline-flex items-center gap-x-1.5 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          onClick={handleSend}
          disabled={!prompt.trim() || fetching}
        >
          <img
            src={avatar}
            alt="Redwood Copilot"
            aria-hidden="true"
            className=" -ml-0.5 h-10 w-10 rounded-full bg-green-200 p-1 ring-2 ring-green-300"
          />
          Ask!
        </button>
      </div>
      <div className="mt-2 text-center text-sm text-gray-500">
        Redwood Copilot might make mistakes. Don&apos;t leaf just yet.
      </div>
    </div>
  )
}

export default ChatForm

```

#### web/src/components/RedwoodCopilot/ChatResponseSection.tsx

```tsx file="web/src/components/RedwoodCopilot/ChatResponseSection.tsx"
import Markdown from 'src/components/Markdown/Markdown'

import avatar from './avatars/rw-copilot-avatar.png'

const ChatResponseSection = ({ data }) => {
  return (
    <div className="text-md rounded-md border border-solid border-green-300 bg-green-200 p-4 text-gray-900">
      <div className="mb-4 flex justify-center">
        <img
          src={avatar}
          alt="Redwood Copilot"
          aria-hidden="true"
          className="h-10 w-10 rounded-full bg-green-100 p-1 ring-2 ring-green-400"
        />
      </div>
      <div className="text-md rounded-md border border-solid border-green-300 bg-green-100 p-4 text-gray-900">
        <Markdown>
          {data.chat.map((response) => response.message).join('')}
        </Markdown>
      </div>
    </div>
  )
}

export default ChatResponseSection

```

#### web/src/components/RedwoodCopilot/Drawer.tsx

```tsx file="web/src/components/RedwoodCopilot/Drawer.tsx"
import { useState } from 'react'

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

import avatar from './avatars/rw-copilot-avatar.png'
import RedwoodCopilot from './RedwoodCopilot'

type props = {
  open: boolean
}

const RedwoodCopilotDrawer = (props?: props) => {
  const [open, setOpen] = useState(props?.open || false)

  if (!open)
    return (
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => setOpen(true)}
          className="overflow-hidden rounded-full bg-green-200 p-1 shadow-lg transition-shadow duration-300 hover:scale-105  hover:shadow-xl hover:ring-2 hover:ring-green-300"
        >
          <img src={avatar} alt="Redwood Copilot" className="h-16 w-16 p-2" />
        </button>
      </div>
    )

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <div className="fixed inset-0" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-[50vw] transform transition duration-1000 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                <div className="px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="flex items-center text-base font-semibold leading-6 text-gray-900">
                      <img
                        src={avatar}
                        alt="Redwood Copilot"
                        aria-hidden="true"
                        className="mr-2 h-10 w-10 rounded-full bg-green-100 p-1 ring-2 ring-green-300"
                      />
                      <span className="text-green-600">Redwood Copilot</span>
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  <RedwoodCopilot />
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
export default RedwoodCopilotDrawer

```

#### web/src/components/RedwoodCopilot/ExamplePromptCards.tsx

```tsx file="web/src/components/RedwoodCopilot/ExamplePromptCards.tsx"
const examplePrompts = [
  {
    title: 'Summary',
    prompt: 'What does this RedwoodJS app do?',
  },
  {
    title: 'GraphQL Streaming',
    prompt:
      'How does GraphQL streaming work with the @stream directive for chat queries?',
  },
  {
    title: 'Chatbot',
    prompt:
      'Explain how the chatbot UI in the RedwoodCopilot component works in this app? Show the code to send the prompt to the server.',
  },
  {
    title: 'Database',
    prompt: 'What database is this app using and describe the schema?',
  },
]

const ExamplePromptCards = ({ setPrompt }) => {
  return (
    <div className="relative overflow-x-auto py-4">
      <ul className="flex space-x-4 whitespace-nowrap">
        {examplePrompts.map((prompt) => (
          <li
            key={prompt.title}
            className="inline-block w-72 flex-shrink-0 rounded-lg bg-green-100 shadow transition-colors duration-300"
          >
            <button
              className="flex h-full w-full cursor-pointer flex-col items-center justify-center space-y-3 p-6 text-center"
              onClick={() => {
                setPrompt(prompt.prompt)
              }}
            >
              <div className="rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M14 6l7 7l-4 4"></path>
                  <path d="M5.828 18.172a2.828 2.828 0 0 0 4 0l10.586 -10.586a2 2 0 0 0 0 -2.829l-1.171 -1.171a2 2 0 0 0 -2.829 0l-10.586 10.586a2.828 2.828 0 0 0 0 4z"></path>
                  <path d="M4 20l1.768 -1.768"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-wrap text-sm font-medium text-green-800 transition-colors duration-300">
                  {prompt.title}
                </h3>
                <p className="mt-1 text-wrap text-sm text-green-700 transition-colors duration-300">
                  {prompt.prompt}
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ExamplePromptCards

```

#### web/src/components/RedwoodCopilot/PromptSection.tsx

```tsx file="web/src/components/RedwoodCopilot/PromptSection.tsx"
import redwoodDeveloperIcon from './avatars/rw-developer.png'

const PromptSection = ({ prompt }: { prompt: string }) => {
  return (
    <div className="text-md rounded-md border border-solid border-gray-300 bg-gray-200 p-4 text-gray-900">
      <div className="mb-4 flex justify-center">
        <img
          src={redwoodDeveloperIcon}
          alt="Redwood Developer"
          aria-hidden="true"
          className="h-10 w-10 rounded-full bg-green-100 p-1 ring-2 ring-gray-500"
        />
      </div>
      <div className="text-md rounded-md border border-solid border-gray-300 bg-gray-100 p-4 text-gray-900">
        {prompt}
      </div>
    </div>
  )
}

export default PromptSection

```

#### web/src/components/RedwoodCopilot/RedwoodCopilot.tsx

```tsx file="web/src/components/RedwoodCopilot/RedwoodCopilot.tsx"
import { useState } from 'react'

import { StreamProvider, g, useQuery } from 'src/StreamProvider'

import ChatForm from './ChatForm'
import ChatResponseSection from './ChatResponseSection'
import ExamplePromptCards from './ExamplePromptCards'
import PromptSection from './PromptSection'
import { ThinkingStatus, getRandomThinkingStatus } from './ThinkingStatus'

const ChatQuery = g(`
  query ChatQuery($input: ChatInput!) {
    chat(input: $input) @stream {
      id
      message
      prompt
    }
  }`)

const debug = false

const RedwoodCopilotComponent = () => {
  const [prompt, setPrompt] = useState('')
  const [thinkingStatus, setThinkingStatus] = useState('')
  const [provider, setProvider] = useState('OPENAI')

  const [{ data, fetching, error }, executeQuery] = useQuery({
    query: ChatQuery,
    variables: {
      input: { prompt, debug, provider },
    },
    pause: true,
  })

  const handleSend = () => {
    const promptValue = prompt.trim()
    if (promptValue) {
      setThinkingStatus(getRandomThinkingStatus())
      executeQuery()
    }
  }

  return (
    <main className="container mx-auto flex h-screen w-full flex-col">
      {error && <div>Error: {error.message}</div>}
      <div className="flex-grow overflow-auto px-4 ">
        <ExamplePromptCards setPrompt={setPrompt} />
        <div className="space-y-2">
          {(fetching || (data && data.chat.length === 0)) && (
            <ThinkingStatus thinkingStatus={thinkingStatus} />
          )}
          {data && data.chat.length > 0 && (
            <div className="space-y-4">
              <PromptSection prompt={data.chat[0].prompt} />
              <ChatResponseSection data={data} />
            </div>
          )}
        </div>
      </div>

      <ChatForm
        prompt={prompt}
        setPrompt={setPrompt}
        provider={provider}
        setProvider={setProvider}
        handleSend={handleSend}
        fetching={fetching}
      />
    </main>
  )
}

// add urql provider
const RedwoodCopilot = () => (
  <StreamProvider>
    <RedwoodCopilotComponent />
  </StreamProvider>
)

export default RedwoodCopilot

```

#### web/src/components/RedwoodCopilot/ThinkingStatus.tsx

```tsx file="web/src/components/RedwoodCopilot/ThinkingStatus.tsx"
import React from 'react'

import avatarThinking from './avatars/rw-copilot-thinking.png'

interface ThinkingStatusProps {
  thinkingStatus: string
}

const thinkingStatuses = [
  'Photosynthesizing ideas...',
  'Growing neural branches...',
  'Calculating trunk circumference...',
  'Analyzing Redwood DNA...',
  'Consulting with wise old trees...',
  'Uploading forest knowledge...',
  'Debugging squirrel queries...',
  'Optimizing pinecone algorithms...',
  'Branching out for solutions...',
  'Rooting through data forests...',
]

export const getRandomThinkingStatus = () => {
  return thinkingStatuses[Math.floor(Math.random() * thinkingStatuses.length)]
}

export const ThinkingStatus: React.FC<ThinkingStatusProps> = ({
  thinkingStatus,
}) => (
  <div className="group block flex-shrink-0">
    <div className="flex animate-pulse items-center">
      <div>
        <img
          src={avatarThinking}
          alt="Redwood Copilot is thinking"
          className="h-24"
        />
      </div>
      <div className="ml-3 text-green-600">{thinkingStatus}</div>
    </div>
  </div>
)

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

#### web/src/components/Post/EditPostCell/EditPostCell.tsx

```tsx file="web/src/components/Post/EditPostCell/EditPostCell.tsx"
import type {
  EditPostById,
  UpdatePostInput,
  UpdatePostMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PostForm from 'src/components/Post/PostForm'

export const QUERY: TypedDocumentNode<EditPostById> = gql`
  query EditPostById($id: Int!) {
    post: post(id: $id) {
      id
      createdAt
      updatedAt
      title
      body
      author
    }
  }
`

const UPDATE_POST_MUTATION: TypedDocumentNode<
  EditPostById,
  UpdatePostMutationVariables
> = gql`
  mutation UpdatePostMutation($id: Int!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      title
      body
      author
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ post }: CellSuccessProps<EditPostById>) => {
  const [updatePost, { loading, error }] = useMutation(UPDATE_POST_MUTATION, {
    onCompleted: () => {
      toast.success('Post updated')
      navigate(routes.posts())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: UpdatePostInput, id: EditPostById['post']['id']) => {
    updatePost({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Post {post?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <PostForm post={post} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}

```

#### web/src/components/Post/NewPost/NewPost.tsx

```tsx file="web/src/components/Post/NewPost/NewPost.tsx"
import type {
  CreatePostMutation,
  CreatePostInput,
  CreatePostMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PostForm from 'src/components/Post/PostForm'

const CREATE_POST_MUTATION: TypedDocumentNode<
  CreatePostMutation,
  CreatePostMutationVariables
> = gql`
  mutation CreatePostMutation($input: CreatePostInput!) {
    createPost(input: $input) {
      id
    }
  }
`

const NewPost = () => {
  const [createPost, { loading, error }] = useMutation(CREATE_POST_MUTATION, {
    onCompleted: () => {
      toast.success('Post created')
      navigate(routes.posts())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: CreatePostInput) => {
    createPost({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Post</h2>
      </header>
      <div className="rw-segment-main">
        <PostForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewPost

```

#### web/src/components/Post/Post/Post.tsx

```tsx file="web/src/components/Post/Post/Post.tsx"
import type {
  DeletePostMutation,
  DeletePostMutationVariables,
  FindPostById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_POST_MUTATION: TypedDocumentNode<
  DeletePostMutation,
  DeletePostMutationVariables
> = gql`
  mutation DeletePostMutation($id: Int!) {
    deletePost(id: $id) {
      id
    }
  }
`

interface Props {
  post: NonNullable<FindPostById['post']>
}

const Post = ({ post }: Props) => {
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    onCompleted: () => {
      toast.success('Post deleted')
      navigate(routes.posts())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeletePostMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete post ' + id + '?')) {
      deletePost({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Post {post.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{post.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(post.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(post.updatedAt)}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{post.title}</td>
            </tr>
            <tr>
              <th>Body</th>
              <td>{post.body}</td>
            </tr>
            <tr>
              <th>Author</th>
              <td>{post.author}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editPost({ id: post.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(post.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Post

```

#### web/src/components/Post/PostCell/PostCell.tsx

```tsx file="web/src/components/Post/PostCell/PostCell.tsx"
import type { FindPostById, FindPostByIdVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Post from 'src/components/Post/Post'

export const QUERY: TypedDocumentNode<
  FindPostById,
  FindPostByIdVariables
> = gql`
  query FindPostById($id: Int!) {
    post: post(id: $id) {
      id
      createdAt
      updatedAt
      title
      body
      author
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Post not found</div>

export const Failure = ({ error }: CellFailureProps<FindPostByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  post,
}: CellSuccessProps<FindPostById, FindPostByIdVariables>) => {
  return <Post post={post} />
}

```

#### web/src/components/Post/PostForm/PostForm.tsx

```tsx file="web/src/components/Post/PostForm/PostForm.tsx"
import type { EditPostById, UpdatePostInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

type FormPost = NonNullable<EditPostById['post']>

interface PostFormProps {
  post?: EditPostById['post']
  onSave: (data: UpdatePostInput, id?: FormPost['id']) => void
  error: RWGqlError
  loading: boolean
}

const PostForm = (props: PostFormProps) => {
  const onSubmit = (data: FormPost) => {
    props.onSave(data, props?.post?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormPost> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="title"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Title
        </Label>

        <TextField
          name="title"
          defaultValue={props.post?.title}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="title" className="rw-field-error" />

        <Label
          name="body"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Body
        </Label>

        <TextField
          name="body"
          defaultValue={props.post?.body}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="body" className="rw-field-error" />

        <Label
          name="author"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Author
        </Label>

        <TextField
          name="author"
          defaultValue={props.post?.author}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="author" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default PostForm

```

#### web/src/components/Post/Posts/Posts.tsx

```tsx file="web/src/components/Post/Posts/Posts.tsx"
import type {
  DeletePostMutation,
  DeletePostMutationVariables,
  FindPosts,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Post/PostsCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_POST_MUTATION: TypedDocumentNode<
  DeletePostMutation,
  DeletePostMutationVariables
> = gql`
  mutation DeletePostMutation($id: Int!) {
    deletePost(id: $id) {
      id
    }
  }
`

const PostsList = ({ posts }: FindPosts) => {
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    onCompleted: () => {
      toast.success('Post deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeletePostMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete post ' + id + '?')) {
      deletePost({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Title</th>
            <th>Body</th>
            <th>Author</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{truncate(post.id)}</td>
              <td>{timeTag(post.createdAt)}</td>
              <td>{timeTag(post.updatedAt)}</td>
              <td>{truncate(post.title)}</td>
              <td>{truncate(post.body)}</td>
              <td>{truncate(post.author)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.post({ id: post.id })}
                    title={'Show post ' + post.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editPost({ id: post.id })}
                    title={'Edit post ' + post.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete post ' + post.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(post.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PostsList

```

#### web/src/components/Post/PostsCell/PostsCell.tsx

```tsx file="web/src/components/Post/PostsCell/PostsCell.tsx"
import type { FindPosts, FindPostsVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Posts from 'src/components/Post/Posts'

export const QUERY: TypedDocumentNode<FindPosts, FindPostsVariables> = gql`
  query FindPosts {
    posts {
      id
      createdAt
      updatedAt
      title
      body
      author
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No posts yet. '}
      <Link to={routes.newPost()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindPosts>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  posts,
}: CellSuccessProps<FindPosts, FindPostsVariables>) => {
  return <Posts posts={posts} />
}

```

### App

#### web/src/App.tsx

```tsx file="web/src/App.tsx"
import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
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

### Stream Provider

#### web/src/StreamProvider.tsx

```tsx file="web/src/StreamProvider.tsx"
import { Provider, client } from './urql'
export { g, useQuery } from './urql'

export const StreamProvider = ({ children }: { children: React.ReactNode }) => (
  <Provider value={client}>{children}</Provider>
)

```

### Urql GraphQL Client

#### web/src/urql.ts

```ts file="web/src/urql.ts"
import { createClient, fetchExchange } from 'urql'
export { Provider, gql as g, useQuery } from 'urql'

export const client = createClient({
  url: '/.redwood/functions/graphql',
  exchanges: [fetchExchange],
})

```
