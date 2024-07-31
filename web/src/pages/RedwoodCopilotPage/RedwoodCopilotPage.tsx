import { useState } from 'react'

import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

import { StreamProvider, g, useQuery } from 'src/StreamProvider'

const ChatCompletionQuery = g(`
  query ChatCompletionQuery($input: CreateChatCompletionInput!) {
    createChatCompletion(input: $input) @stream {
      id
      message
      threadId
    }
  }`)

const CodeBlock = ({ className, children }) => {
  const match = /language-(\w+)/.exec(className || '')
  return match ? (
    <SyntaxHighlighter language={match[1]} PreTag="div">
      {String(children)}
    </SyntaxHighlighter>
  ) : (
    <code className={`${className} whitespace-pre-wrap`}>{children}</code>
  )
}

const RedwoodCopilot = () => {
  const [prompt, setPrompt] = useState('')

  const shouldPause = !prompt || prompt.trim() === ''
  const [{ data, fetching, error }, executeQuery] = useQuery({
    query: ChatCompletionQuery,
    variables: { input: { prompt, debug: false, stream: true } },
    pause: shouldPause,
  })
  // const [message, setMessage] = useState('')

  const handleSend = () => {
    const promptValue = (
      document.querySelector('input[name="prompt"]') as HTMLInputElement
    ).value
    setPrompt(promptValue)
    executeQuery()
  }

  return (
    <main className="container mx-auto flex h-screen flex-col lg:w-2/3">
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
          {data && (
            <div className="space-y-4">
              <div className="text-md rounded-md border border-solid border-gray-300 bg-gray-200 p-4 text-gray-900">
                {prompt}
              </div>
              <div className="text-md rounded-md border border-solid border-blue-300 bg-blue-200 p-4 text-gray-900">
                <>
                  <ReactMarkdown components={{ code: CodeBlock }}>
                    {data.createChatCompletion
                      .map((completion) => completion.message)
                      .join('')}
                  </ReactMarkdown>
                </>
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
            disabled={fetching}
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
