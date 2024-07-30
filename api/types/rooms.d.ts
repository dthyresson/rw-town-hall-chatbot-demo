import type { GraphQLResolveInfo } from 'graphql'

import type { RedwoodGraphQLContext } from '@redwoodjs/graphql-server/dist/types'

import type { Message as RTMessage } from './shared-return-types'
import type { SendMessageInput, Query, Mutation } from './shared-schema-types'

/** SDL: room(id: ID!): [Message!]! */
export interface RoomResolver {
  (
    args: { id: ID },
    obj?: {
      root: Query
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): RTMessage[] | Promise<RTMessage[]> | (() => Promise<RTMessage[]>)
}

/** SDL: rooms: [ID!]! */
export interface RoomsResolver {
  (
    args?: object,
    obj?: {
      root: Query
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): ID[] | Promise<ID[]> | (() => Promise<ID[]>)
}

/** SDL: sendMessage(input: SendMessageInput!): Message! */
export interface SendMessageResolver {
  (
    args: { input: SendMessageInput },
    obj: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTMessage>
}

type ID = any
