import { useState } from 'react'

import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

import { StreamProvider, g, useQuery } from 'src/StreamProvider'

import avatar from './avatars/rw-copilot-avatar.png'
import avatarThinking from './avatars/rw-copilot-thinking.png'
import redwoodDeveloperIcon from './avatars/rw-developer.png'

const ChatCompletionQuery = g(`
  query ChatCompletionQuery($input: CreateChatCompletionInput!) {
    createChatCompletion(input: $input) @stream {
      id
      message
      threadId
      prompt
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

const debug = false
const stream = true

const RedwoodCopilotComponent = () => {
  const [prompt, setPrompt] = useState('')
  const [thinkingStatement, setThinkingStatement] = useState('')

  const thinkingStatements = [
    "I'm thinking...",
    'Processing your request...',
    'Analyzing the code...',
    'Searching for the best answer...',
    'Compiling information...',
    'Crunching the data...',
    'Pondering deeply...',
    'Consulting my neural networks...',
    'Exploring possibilities...',
    'Synthesizing a response...',
  ]

  const getRandomThinkingStatement = () => {
    return thinkingStatements[
      Math.floor(Math.random() * thinkingStatements.length)
    ]
  }

  const [{ data, fetching, error }, executeQuery] = useQuery({
    query: ChatCompletionQuery,
    variables: { input: { prompt, debug, stream } },
    pause: true,
  })

  const handleSend = () => {
    const promptValue = prompt.trim()
    if (promptValue) {
      setThinkingStatement(getRandomThinkingStatement())
      executeQuery()
    }
  }

  return (
    <main className="container mx-auto flex h-screen w-full flex-col">
      <div className="flex-grow overflow-auto px-4 ">
        <div className="space-y-2">
          {fetching ||
            (data && data.createChatCompletion.length === 0 && (
              <div className="group block flex-shrink-0">
                <div className="flex animate-pulse items-center">
                  <div>
                    <img
                      src={avatarThinking}
                      alt="Redwood Copilot is thinking"
                      className="h-24 "
                    />{' '}
                  </div>
                  <div className="ml-3 text-green-600">{thinkingStatement}</div>
                </div>
              </div>
            ))}
          {error && <div>Error: {error.message}</div>}
          {data && data.createChatCompletion.length > 0 && (
            <div className="space-y-4">
              <div className="text-md rounded-md border border-solid border-gray-300 bg-gray-200 p-4 text-gray-900">
                <div className="mb-4 flex justify-center">
                  <img
                    src={redwoodDeveloperIcon}
                    alt="Redwood Developer"
                    aria-hidden="true"
                    className="h-10 w-10 rounded-full bg-green-100 p-1 ring-2 ring-gray-500"
                  />
                </div>
                <div className="text-md rounded-md border border-solid border-gray-300 bg-gray-100 p-4 text-gray-900">
                  {data.createChatCompletion[0].prompt}
                </div>
              </div>
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
                  <ReactMarkdown components={{ code: CodeBlock }}>
                    {data.createChatCompletion
                      .map((completion) => completion.message)
                      .join('')}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="sticky bottom-0 mb-0 w-full bg-white px-4 pt-8">
        <div className="flex gap-2">
          <input
            type="text"
            name="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask me anything about your RedwoodJS project"
            required
            disabled={fetching}
            className="flex-grow rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

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
      </div>
    </main>
  )
}

// add urql provider
const RedwoodCopilot = () => (
  <StreamProvider>
    <RedwoodCopilotComponent />
  </StreamProvider>
)

export default RedwoodCopilot