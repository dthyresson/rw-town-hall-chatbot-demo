import { useState, useEffect } from 'react'

import { useSubscription } from '@redwoodjs/web'

import MessageList from 'src/components/MessageList/MessageList'

const LISTEN_FOR_NEW_MESSAGES = gql`
  subscription ListenForNewMessagesInRoom($roomId: ID!) {
    newMessage(roomId: $roomId) {
      body
      from
    }
  }
`

const ChatRoom = ({ roomId }: { roomId: string }) => {
  const [messages, setMessages] = useState<
    Array<{ body: string; from: string }>
  >([])

  const { data, error } = useSubscription(LISTEN_FOR_NEW_MESSAGES, {
    variables: { roomId },
  })

  useEffect(() => {
    if (data?.newMessage) {
      setMessages((prevMessages) => [data.newMessage, ...prevMessages])
    }
  }, [data])

  if (error) return <p>Error: {error.message}</p>

  return <MessageList messages={messages} />
}

export default ChatRoom
