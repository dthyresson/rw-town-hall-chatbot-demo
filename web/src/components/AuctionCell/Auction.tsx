import type { Auction, Bid } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

const Auction = ({
  auction,
  summary,
}: {
  auction: Auction
  summary?: boolean
}) => {
  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      <h2 className="text-xl font-bold">{auction.title}</h2>
      {summary ? <BidSummary auction={auction} /> : <Bids auction={auction} />}
    </div>
  )
}

const BidSummary = ({ auction }: { auction: Auction }) => {
  return (
    <>
      <div className="mt-2">
        <Link
          to={routes.auction({ id: auction.id })}
          className="text-blue-500 hover:text-blue-700"
        >
          <span className="font-normal">{auction.bids.length}</span> bids
        </Link>
      </div>
      <div className="text-lg font-semibold">
        {auction.highestBid?.amount} highest
      </div>
    </>
  )
}

const Bids = ({ auction }: { auction: Auction }) => {
  const bids = auction.bids
  return (
    <div className="mt-2 grid grid-cols-1 gap-2">
      {bids.map((bid, i) => (
        <Bid key={`${auction.id}-${bid.amount}-${i}`} bid={bid} />
      ))}
    </div>
  )
}

const Bid = ({ bid }: { bid: Bid }) => {
  return <div className="rounded bg-gray-100 p-2">{bid.amount}</div>
}

export default Auction
