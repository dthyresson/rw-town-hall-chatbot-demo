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
  generateCodebase?: boolean | null
  sendMessage: Message
}

export interface Query {
  __typename?: 'Query'
  alphabet: string[]
  auction?: Auction | null
  auctions: Auction[]
  chatCompletions: ChatCompletion[]
  createChatCompletion: ChatCompletion[]
  fastField: string
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

type ID = any
type JSON = any
