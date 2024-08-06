import React from 'react'

import avatar from './avatars/rw-copilot-avatar.png'

interface ChatFormProps {
  prompt: string
  setPrompt: (prompt: string) => void
  provider: string
  setProvider: (provider: string) => void
  handleSend: () => void
  fetching: boolean
}

const ChatForm: React.FC<ChatFormProps> = ({
  prompt,
  setPrompt,
  provider,
  setProvider,
  handleSend,
  fetching,
}) => {
  return (
    <div className="sticky bottom-0 mb-0 w-full bg-white px-4 pt-8">
      <div className="flex gap-2">
        <input
          type="text"
          name="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
          placeholder="Ask me anything about your RedwoodJS project"
          required
          disabled={fetching}
          className="flex-grow rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <select
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          className="rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="OPENAI">OpenAI</option>
          <option value="OPENAI_WITH_UNKEY_CACHE">OpenAI Cached</option>
          <option value="LANGBASE">Langbase</option>
        </select>

        <button
          type="button"
          className="inline-flex items-center gap-x-1.5 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          onClick={handleSend}
          disabled={!prompt.trim() || fetching}
        >
          <img
            src={avatar}
            alt="Redwood Copilot"
            aria-hidden="true"
            className=" -ml-0.5 h-10 w-10 rounded-full bg-green-200 p-1 ring-2 ring-green-300"
          />
          Ask!
        </button>
      </div>
      <div className="mt-2 text-center text-sm text-gray-500">
        Redwood Copilot might make mistakes. Don&apos;t leaf just yet.
      </div>
    </div>
  )
}

export default ChatForm
