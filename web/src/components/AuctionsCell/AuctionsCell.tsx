import type { AuctionsQuery, AuctionsQueryVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Auction from '../AuctionCell/Auction'

export const QUERY: TypedDocumentNode<
  AuctionsQuery,
  AuctionsQueryVariables
> = gql`
  query AuctionsQuery @live {
    auctions {
      id
      title
      highestBid {
        amount
      }
      bids {
        amount
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ auctions }: CellSuccessProps<AuctionsQuery>) => {
  return (
    <ul className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
      {auctions.map((auction) => {
        return (
          <li key={auction.id} className="rounded bg-gray-100 p-2">
            <Auction auction={auction} summary={true} />
          </li>
        )
      })}
    </ul>
  )
}
