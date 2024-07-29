import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <>
      <Metadata title="Realtime Demo" description="Realtime Demo" />

      <h1 className="text-3xl">Realtime Demo</h1>
      <p>
        <Link to={routes.auctions()}>Auctions</Link>
      </p>
      <p>
        <Link to={routes.chatRooms()}>Chat Rooms</Link>
      </p>
      <p>
        <Link to={routes.alphabet()}>Alphabet</Link>
      </p>
      <p>
        <Link to={routes.redwoodCopilot()}>Redwood Copilot</Link>
      </p>
    </>
  )
}

export default HomePage
