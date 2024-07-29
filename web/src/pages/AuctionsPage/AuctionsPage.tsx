import { Metadata } from '@redwoodjs/web'

import AuctionsCell from 'src/components/AuctionsCell'

const AuctionsPage = () => {
  return (
    <>
      <Metadata title="Auctions" description="Auctions page" />

      <h1>Auctions</h1>
      <AuctionsCell />
    </>
  )
}

export default AuctionsPage
