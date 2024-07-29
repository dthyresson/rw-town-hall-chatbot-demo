import { Metadata } from '@redwoodjs/web'

import ChatRoom from 'src/components/ChatRoom/ChatRoom'

const ChatPage = ({ id }: { id: string }) => {
  return (
    <>
      <Metadata title="Chat" description="Chat page" />
      <h1>Chat room {id}</h1>
      <ChatRoom roomId={id} />
    </>
  )
}

export default ChatPage
