import type {
  FindCodebaseQuery,
  FindCodebaseQueryVariables,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
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
  const truncatedCodebase = codebase.split('\n').slice(0, 70).join('\n')
  return (
    <>
      <div className="my-4 text-center">
        <Link
          to={routes.viewFile({ path: `.rw-chatbot/CODEBASE_TOC.md` })}
          className="text-sm font-semibold leading-6 text-green-600"
        >
          View Complete Codebase <span aria-hidden="true">→</span>
        </Link>
      </div>
      <div className="my-4 rounded-lg border border-solid border-gray-200 bg-white p-12">
        <Markdown>{truncatedCodebase}</Markdown>
      </div>
      <div className="mt-y text-center">
        <Link
          to={routes.viewFile({ path: `.rw-chatbot/CODEBASE_TOC.md` })}
          className="text-sm font-semibold leading-6 text-green-600"
        >
          View Complete Codebase <span aria-hidden="true">→</span>
        </Link>
      </div>
    </>
  )
}
