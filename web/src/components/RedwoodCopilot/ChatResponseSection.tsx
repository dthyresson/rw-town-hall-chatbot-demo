import Markdown from 'src/components/Markdown/Markdown'

import avatar from './avatars/rw-copilot-avatar.png'

const ChatResponseSection = ({ data }) => {
  return (
    <div className="text-md rounded-md border border-solid border-green-300 bg-green-200 p-4 text-gray-900">
      <div className="mb-4 flex justify-center">
        <img
          src={avatar}
          alt="Redwood Copilot"
          aria-hidden="true"
          className="h-10 w-10 rounded-full bg-green-100 p-1 ring-2 ring-green-400"
        />
      </div>
      <div className="text-md rounded-md border border-solid border-green-300 bg-green-100 p-4 text-gray-900">
        <Markdown>
          {data.chat.map((response) => response.message).join('')}
        </Markdown>
      </div>
    </div>
  )
}

export default ChatResponseSection
