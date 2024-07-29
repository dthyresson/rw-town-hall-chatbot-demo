export const schema = gql`
  type Query {
    redwoodCopilot(prompt: String!): [String!]! @skipAuth
  }
`
