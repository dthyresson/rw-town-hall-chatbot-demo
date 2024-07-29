import type { FindAuctionQuery, FindAuctionQueryVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Auction from './Auction'

export const beforeQuery = (props) => {
  return { variables: props }
}

export const QUERY: TypedDocumentNode<
  FindAuctionQuery,
  FindAuctionQueryVariables
> = gql`
  query FindAuctionQuery($id: ID!) @live {
    auction: auction(id: $id) {
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

export const Failure = ({
  error,
}: CellFailureProps<FindAuctionQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  auction,
}: CellSuccessProps<FindAuctionQuery, FindAuctionQueryVariables>) => {
  return (
    <>
      <Auction auction={auction} />
    </>
  )
}
