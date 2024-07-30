import type { GraphQLResolveInfo } from 'graphql'

import type { RedwoodGraphQLContext } from '@redwoodjs/graphql-server/dist/types'

import type { Query } from './shared-schema-types'

/**
 * SDL: """A field that resolves fast."""
 * fastField: String!
 */
export interface FastFieldResolver {
  (
    args?: object,
    obj?: {
      root: Query
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<string>
}

/**
 * SDL: """
 * A field that resolves slowly.
 * Maybe you want to @defer this field ;)
 * """
 * slowField(waitFor: Int! = 5000): String
 */
export interface SlowFieldResolver {
  (
    args: { waitFor: number },
    obj: {
      root: Query
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<string | null>
}
