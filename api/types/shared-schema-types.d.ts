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

export interface ChatInput {
  __typename?: 'ChatInput'
  debug?: boolean | null
  prompt: string
  provider?: ChatProvider | null
}

export type ChatProvider = 'LANGBASE' | 'OPENAI' | 'OPENAI_WITH_UNKEY_CACHE'

export interface ChatResponse {
  __typename?: 'ChatResponse'
  id: ID
  message: string
  prompt: string
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
  createPost: Post
  deletePost: Post
  generateCodebase?: boolean | null
  sendMessage: Message
  updatePost: Post
}

export interface Post {
  __typename?: 'Post'
  author: string
  body?: string | null
  createdAt: DateTime
  id: number
  title: string
  updatedAt: DateTime
}

export interface Query {
  __typename?: 'Query'
  alphabet: string[]
  auction?: Auction | null
  auctions: Auction[]
  chat: ChatResponse[]
  codebase?: string | null
  fastField: string
  loadFile?: string | null
  post?: Post | null
  posts: Post[]
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
type DateTime = any
type JSON = any
