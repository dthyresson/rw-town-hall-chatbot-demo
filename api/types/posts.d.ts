import type { GraphQLResolveInfo } from 'graphql'

import type { RedwoodGraphQLContext } from '@redwoodjs/graphql-server/dist/types'

import type { Post as RTPost } from './shared-return-types'
import type {
  CreatePostInput,
  UpdatePostInput,
  Query,
  Mutation,
} from './shared-schema-types'

/** SDL: posts: [Post!]! */
export interface PostsResolver {
  (
    args?: object,
    obj?: {
      root: Query
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): RTPost[] | Promise<RTPost[]> | (() => Promise<RTPost[]>)
}

/** SDL: post(id: Int!): Post */
export interface PostResolver {
  (
    args: { id: number },
    obj?: {
      root: Query
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): RTPost | null | Promise<RTPost | null> | (() => Promise<RTPost | null>)
}

/** SDL: createPost(input: CreatePostInput!): Post! */
export interface CreatePostResolver {
  (
    args: { input: CreatePostInput },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): RTPost | Promise<RTPost> | (() => Promise<RTPost>)
}

/** SDL: updatePost(id: Int!, input: UpdatePostInput!): Post! */
export interface UpdatePostResolver {
  (
    args: { id: number; input: UpdatePostInput },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): RTPost | Promise<RTPost> | (() => Promise<RTPost>)
}

/** SDL: deletePost(id: Int!): Post! */
export interface DeletePostResolver {
  (
    args: { id: number },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): RTPost | Promise<RTPost> | (() => Promise<RTPost>)
}
