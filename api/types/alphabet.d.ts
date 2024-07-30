import type { GraphQLResolveInfo } from 'graphql'

import type { RedwoodGraphQLContext } from '@redwoodjs/graphql-server/dist/types'

import type { Query } from './shared-schema-types'

/**
 * SDL: """
 * A field that spells out the letters of the alphabet
 * Maybe you want to @stream this field ;)
 * """
 * alphabet: [String!]!
 */
export interface AlphabetResolver {
  (
    args?: object,
    obj?: {
      root: Query
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<string[]>
}
