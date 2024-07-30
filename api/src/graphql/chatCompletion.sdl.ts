export const schema = gql`
  type ChatCompletion {
    id: ID!
    threadId: ID!
    prompt: String!
    message: String!
  }

  type Query {
    chatCompletions(threadId: ID!): [ChatCompletion!]! @skipAuth
    createChatCompletion(input: CreateChatCompletionInput!): [ChatCompletion!]!
      @skipAuth
  }

  input CreateChatCompletionInput {
    prompt: String!
    stream: Boolean = true
    debug: Boolean = false
  }
`
