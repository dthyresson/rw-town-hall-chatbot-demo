export const schema = gql`
  input GenCodebaseInput {
    upload: Boolean = false
  }

  type Mutation {
    generateCodebase(args: GenCodebaseInput): Boolean @skipAuth
  }
  type Query {
    codebase: String @skipAuth
    loadFile(path: String): String @skipAuth
  }
`
