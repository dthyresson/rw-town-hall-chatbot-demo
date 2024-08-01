import type {
  FindCodebaseQuery,
  FindCodebaseQueryVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Markdown from 'src/components/Markdown/Markdown'

export const QUERY: TypedDocumentNode<
  FindCodebaseQuery,
  FindCodebaseQueryVariables
> = gql`
  query FindCodebaseQuery {
    codebase
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindCodebaseQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  codebase,
}: CellSuccessProps<FindCodebaseQuery, FindCodebaseQueryVariables>) => {
  return <Markdown>{codebase}</Markdown>
}
