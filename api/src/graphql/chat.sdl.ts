export const schema = gql`
  type ChatResponse {
    id: ID!
    prompt: String!
    message: String!
  }

  type Query {
    chat(input: ChatInput!): [ChatResponse!]! @skipAuth
  }

  enum ChatProvider {
    OPENAI
    OPENAI_WITH_UNKEY_CACHE
    LANGBASE
  }

  input ChatInput {
    prompt: String!
    provider: ChatProvider = OPENAI
    debug: Boolean = false
  }
`
