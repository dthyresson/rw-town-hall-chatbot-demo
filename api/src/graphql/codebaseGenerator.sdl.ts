export const schema = gql`
  input GenCodebaseInput {
    upload: Boolean = false
  }

  type Mutation {
    generateCodebase(args: GenCodebaseInput): Boolean @skipAuth
  }
`
