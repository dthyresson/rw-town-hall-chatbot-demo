import { Metadata } from '@redwoodjs/web'

import RoomsCell from 'src/components/RoomsCell'

const ChatRoomsPage = () => {
  return (
    <>
      <Metadata title="ChatRooms" description="ChatRooms page" />

      <h1>Chat Rooms</h1>
      <RoomsCell />
    </>
  )
}

export default ChatRoomsPage
