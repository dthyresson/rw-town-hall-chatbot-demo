import type { GraphQLResolveInfo } from 'graphql'

import type { RedwoodGraphQLContext } from '@redwoodjs/graphql-server/dist/types'

import type { Auction as RTAuction, Bid as RTBid } from './shared-return-types'
import type { BidInput, Bid, Query, Mutation } from './shared-schema-types'

/** SDL: auctions: [Auction!]! */
export interface AuctionsResolver {
  (
    args?: object,
    obj?: {
      root: Query
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): RTAuction[] | Promise<RTAuction[]> | (() => Promise<RTAuction[]>)
}

/** SDL: auction(id: ID!): Auction */
export interface AuctionResolver {
  (
    args: { id: ID },
    obj?: {
      root: Query
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTAuction | null>
}

/** SDL: bid(input: BidInput!): Bid */
export interface BidResolver {
  (
    args: { input: BidInput },
    obj: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTBid | null>
}

export interface AuctionTypeResolvers {
  /** SDL: highestBid: Bid */
  highestBid: (
    args: undefined,
    obj: {
      root: AuctionAsParent
      context?: RedwoodGraphQLContext
      info?: GraphQLResolveInfo
    }
  ) => RTBid | null | Promise<RTBid | null> | (() => Promise<RTBid | null>)
}

type AuctionAsParent = PAuction & {
  highestBid: () =>
    | RTBid
    | null
    | Promise<RTBid | null>
    | (() => Promise<RTBid | null>)
}
type ID = any
