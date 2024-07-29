// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import AuctionCell from 'src/components/AuctionCell'

type props = {
  id: number
}

const AuctionPage = (props: props) => {
  return (
    <>
      <Metadata title="Auction" description="Auction page" />

      <h1>Auction</h1>
      <AuctionCell id={props.id} />
    </>
  )
}

export default AuctionPage
