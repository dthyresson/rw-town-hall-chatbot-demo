import type {
  FindLoadFileQuery,
  FindLoadFileQueryVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Markdown from 'src/components/Markdown'

export const QUERY: TypedDocumentNode<
  FindLoadFileQuery,
  FindLoadFileQueryVariables
> = gql`
  query FindLoadFileQuery($path: String!) {
    loadFile(path: $path)
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindLoadFileQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  loadFile,
}: CellSuccessProps<FindLoadFileQuery, FindLoadFileQueryVariables>) => {
  return (
    <div className="mx-auto rounded-md border border-green-300 bg-green-100 p-4 lg:w-2/3">
      <Markdown>{`\`\`\`ts ${loadFile}\`\`\``}</Markdown>
    </div>
  )
}
