import type { GraphQLResolveInfo } from 'graphql'

import type { RedwoodGraphQLContext } from '@redwoodjs/graphql-server/dist/types'

import type { GenCodebaseInput, Mutation } from './shared-schema-types'

/** SDL: generateCodebase(args: GenCodebaseInput): Boolean */
export interface GenerateCodebaseResolver {
  (
    args: { args?: GenCodebaseInput },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<boolean | null>
}
