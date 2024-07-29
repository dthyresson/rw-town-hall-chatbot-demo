import type { RoomsQuery, RoomsQueryVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

export const QUERY: TypedDocumentNode<RoomsQuery, RoomsQueryVariables> = gql`
  query RoomsQuery {
    rooms
  }
`

import ChatRoom from 'src/components/ChatRoom/ChatRoom'

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ rooms }: CellSuccessProps<RoomsQuery>) => {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {rooms.map((roomId) => {
        return (
          <div key={roomId} className="rounded-lg bg-white">
            <h2 className="text-center text-2xl font-bold">
              <Link
                to={routes.chat({ id: roomId })}
                className="mt-2 block text-center text-blue-600 hover:text-blue-800"
              >
                Room {roomId}
              </Link>
            </h2>
            <ChatRoom roomId={roomId} />
          </div>
        )
      })}
    </div>
  )
}
