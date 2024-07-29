type Message = {
  body: string
  from: string
}

const MessageList = ({ messages }: { messages: Message[] }) => {
  return (
    <ul className="space-y-4">
      {messages.map((message, index) => (
        <li key={index} className="rounded-lg bg-gray-100 p-4 shadow-sm">
          <p className="font-semibold text-gray-800">{message.from}</p>
          <p className="mt-1 text-gray-600">{message.body}</p>
        </li>
      ))}
    </ul>
  )
}

export default MessageList
