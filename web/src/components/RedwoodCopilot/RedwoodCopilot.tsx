import { useState } from 'react'

import Markdown from 'src/components/Markdown/Markdown'
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

const debug = false
const stream = true

const thinkingStatements = [
  'Photosynthesizing ideas...',
  'Growing neural branches...',
  'Calculating trunk circumference...',
  'Analyzing Redwood DNA...',
  'Consulting with wise old trees...',
  'Uploading forest knowledge...',
  'Debugging squirrel queries...',
  'Optimizing pinecone algorithms...',
  'Branching out for solutions...',
  'Rooting through data forests...',
]

const getRandomThinkingStatement = () => {
  return thinkingStatements[
    Math.floor(Math.random() * thinkingStatements.length)
  ]
}

const examplePrompts = [
  {
    title: 'Summary',
    prompt: 'Summarize the contents of my RedwoodJS app using the README.',
  },
  {
    title: 'Cells',
    prompt: 'List the cells in my RedwoodJS app.',
  },
  {
    title: 'Routes',
    prompt: 'List the routes in my RedwoodJS app.',
  },
]

const ExamplePromptCards = ({ setPrompt }) => {
  return (
    <ul className="grid grid-cols-1 gap-6 py-4 text-green-900 sm:grid-cols-2 lg:grid-cols-3 dark:text-green-200">
      {examplePrompts.map((prompt) => (
        <li
          key={prompt.title}
          className="group col-span-1 rounded-lg bg-green-100 shadow transition-colors duration-300"
        >
          <button
            className="flex w-full cursor-pointer flex-col items-center justify-center space-y-3 p-6 text-center"
            onClick={() => {
              setPrompt(prompt.prompt)
            }}
          >
            <div className="rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M14 6l7 7l-4 4"></path>
                <path d="M5.828 18.172a2.828 2.828 0 0 0 4 0l10.586 -10.586a2 2 0 0 0 0 -2.829l-1.171 -1.171a2 2 0 0 0 -2.829 0l-10.586 10.586a2.828 2.828 0 0 0 0 4z"></path>
                <path d="M4 20l1.768 -1.768"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-green-800 transition-colors duration-300">
                {prompt.title}
              </h3>
              <p className="mt-1 text-sm text-green-700 transition-colors duration-300">
                {prompt.prompt}
              </p>
            </div>
          </button>
        </li>
      ))}
    </ul>
  )
}

const RedwoodCopilotComponent = () => {
  const [prompt, setPrompt] = useState('')
  const [thinkingStatement, setThinkingStatement] = useState('')

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
      {error && <div>Error: {error.message}</div>}
      <div className="flex-grow overflow-auto px-4 ">
        <ExamplePromptCards setPrompt={setPrompt} />
        <div className="space-y-2">
          {fetching ||
            (data && data.createChatCompletion.length === 0 && (
              <div className="group block flex-shrink-0">
                <div className="flex animate-pulse items-center">
                  <div>
                    <img
                      src={avatarThinking}
                      alt="Redwood Copilot is thinking"
                      className="h-24"
                    />
                  </div>
                  <div className="ml-3 text-green-600">{thinkingStatement}</div>
                </div>
              </div>
            ))}
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
                  <Markdown>
                    {data.createChatCompletion
                      .map((completion) => completion.message)
                      .join('')}
                  </Markdown>
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
