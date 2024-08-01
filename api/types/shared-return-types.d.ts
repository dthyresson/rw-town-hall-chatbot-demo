import type { Post as PPost } from '@prisma/client'

// You may very reasonably ask yourself, 'what is this file?' and why do I need it.

// Roughly, this file ensures that when a resolver wants to return a type - that
// type will match a prisma model. This is useful because you can trivially extend
// the type in the SDL and not have to worry about type mis-matches because the thing
// you returned does not include those functions.

// This gets particularly valuable when you want to return a union type, an interface,
// or a model where the prisma model is nested pretty deeply (GraphQL connections, for example.)
export interface Auction {
  __typename?: 'Auction'
  bids: Bid[]
  highestBid?: Bid | null
  id: ID
  title: string
}

export interface Bid {
  __typename?: 'Bid'
  amount: number
}

export interface BidInput {
  __typename?: 'BidInput'
  amount: number
  auctionId: ID
}

export interface ChatCompletion {
  __typename?: 'ChatCompletion'
  id: ID
  message: string
  prompt: string
  threadId: ID
}

export interface CreateChatCompletionInput {
  __typename?: 'CreateChatCompletionInput'
  debug?: boolean | null
  prompt: string
  stream?: boolean | null
}

export interface CreatePostInput {
  __typename?: 'CreatePostInput'
  author: string
  body?: string | null
  title: string
}

export interface GenCodebaseInput {
  __typename?: 'GenCodebaseInput'
  upload?: boolean | null
}

export interface Message {
  __typename?: 'Message'
  body?: string | null
  from?: string | null
}

export interface Mutation {
  __typename?: 'Mutation'
  bid?: Bid | null
  createPost: PPost
  deletePost: PPost
  generateCodebase?: boolean | null
  sendMessage: Message
  updatePost: PPost
}

export interface Query {
  __typename?: 'Query'
  alphabet: string[]
  auction?: Auction | null
  auctions: Auction[]
  chatCompletions: ChatCompletion[]
  codebase?: string | null
  createChatCompletion: ChatCompletion[]
  fastField: string
  loadFile?: string | null
  post?: PPost | null
  posts: PPost[]
  redwood?: Redwood | null
  room: Message[]
  rooms: ID[]
  slowField?: string | null
}

export interface Redwood {
  __typename?: 'Redwood'
  currentUser?: JSON | null
  prismaVersion?: string | null
  version?: string | null
}

export interface SendMessageInput {
  __typename?: 'SendMessageInput'
  body: string
  from: string
  roomId: ID
}

export interface Subscription {
  __typename?: 'Subscription'
  countdown: number
  newMessage: Message
}

export interface UpdatePostInput {
  __typename?: 'UpdatePostInput'
  author?: string | null
  body?: string | null
  title?: string | null
}

type ID = any
type JSON = any
export type Post = PPost
