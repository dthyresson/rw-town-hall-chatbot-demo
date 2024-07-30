import type { GraphQLResolveInfo } from 'graphql'

import type { RedwoodGraphQLContext } from '@redwoodjs/graphql-server/dist/types'

import type { ChatCompletion as RTChatCompletion } from './shared-return-types'
import type { CreateChatCompletionInput, Query } from './shared-schema-types'

/** SDL: createChatCompletion(input: CreateChatCompletionInput!): [ChatCompletion!]! */
export interface CreateChatCompletionResolver {
  (
    args: { input: CreateChatCompletionInput },
    obj?: {
      root: Query
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTChatCompletion[]>
}
