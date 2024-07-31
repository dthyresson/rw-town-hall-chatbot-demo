import { useState, useEffect, useRef } from 'react'

import ReactMarkdown from 'react-markdown'

import { StreamProvider, g, useQuery } from 'src/StreamProvider'

const ChatCompletionQuery = g(`
  query ChatCompletionQuery($input: CreateChatCompletionInput!) {
    createChatCompletion(input: $input) @stream {
      id
      message
      threadId
    }
  }`)

const RedwoodCopilot = () => {
  const [prompt, setPrompt] = useState('')
  const [{ data, fetching, error }, executeQuery] = useQuery({
    query: ChatCompletionQuery,
    variables: { input: { prompt, debug: true, stream: true } },
    pause: true,
  })
  const [message, setMessage] = useState('')
  const lastMessageLengthRef = useRef(0)

  useEffect(() => {
    if (data?.createChatCompletion) {
      setMessage((prevMessage) => {
        const fullNewMessage = data.createChatCompletion
          .map((item) => item.message)
          .join('')
        const newContent = fullNewMessage.slice(lastMessageLengthRef.current)
        lastMessageLengthRef.current = fullNewMessage.length
        return [prevMessage, newContent].join('')
      })
    }
  }, [data])

  const handleSend = () => {
    const promptValue = (
      document.querySelector('input[name="prompt"]') as HTMLInputElement
    ).value
    setMessage('')
    setPrompt(promptValue)
    executeQuery()
  }

  return (
    <main className="container mx-auto flex h-screen flex-col lg:w-1/2">
      <h1 className="py-4 text-4xl font-bold">Redwoodie</h1>

      <div className="flex-grow overflow-auto px-4">
        <div className="space-y-2">
          {fetching && (
            <div className="space-y-2">
              <div className="animate-pulse text-center text-xl font-bold text-purple-600">
                AI is thinking ...
              </div>
              <div className="text-md rounded-md border border-solid border-gray-300 bg-blue-200 p-4 text-gray-600">
                {prompt}
              </div>
            </div>
          )}
          {error && <div>Error: {error.message}</div>}
          {message && (
            <div className="space-y-2">
              <div className="text-md rounded-md border border-solid border-gray-300 bg-blue-200 p-4 text-gray-600">
                {prompt}
              </div>
              <div className="text-md rounded-md border border-solid border-gray-300 bg-gray-100 p-4 text-gray-600">
                <ReactMarkdown>{message}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="sticky bottom-0 w-full bg-white p-4">
        <div className="flex gap-2">
          <input
            type="text"
            name="prompt"
            placeholder="Ask me anything about your RedwoodJS project"
            required
            className="flex-grow rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => handleSend()}
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </div>
      </div>
    </main>
  )
}

// add urql provider
const RedwoodCopilotPage = () => (
  <StreamProvider>
    <RedwoodCopilot />
  </StreamProvider>
)

export default RedwoodCopilotPage
