import type { GraphQLResolveInfo } from 'graphql'

import type { RedwoodGraphQLContext } from '@redwoodjs/graphql-server/dist/types'

import type { ChatResponse as RTChatResponse } from './shared-return-types'
import type { ChatInput, Query } from './shared-schema-types'

/** SDL: chat(input: ChatInput!): [ChatResponse!]! */
export interface ChatResolver {
  (
    args: { input: ChatInput },
    obj?: {
      root: Query
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTChatResponse[]>
}
