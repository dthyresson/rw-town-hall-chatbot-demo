import { useState } from 'react'

import { Metadata } from '@redwoodjs/web'

import { StreamProvider, useQuery, g } from 'src/StreamProvider'

const RedwoodCopilotQuery = g(`
  query RedwoodCopilotQuery($prompt: String!) {
    redwoodCopilot(prompt: $prompt) @stream
  }`)

const PromptMessageComponent = ({ prompt, message }) => {
  return (
    <div className="flex-1 overflow-y-auto bg-slate-300 text-sm leading-6 text-slate-900 shadow-md sm:text-base sm:leading-7 dark:bg-slate-800 dark:text-slate-300">
      <div className="flex flex-row px-4 py-8 sm:px-6">
        <img
          alt="User"
          className="mr-2 flex h-8 w-8 rounded-full sm:mr-4"
          src="https://dummyimage.com/256x256/363536/ffffff&text=U"
        />

        <div className="flex max-w-3xl items-center">
          <p>{prompt}</p>
        </div>
      </div>

      <div className="flex bg-slate-100 px-4 py-8 sm:px-6 dark:bg-slate-900">
        <img
          alt="Assistant"
          className="mr-2 flex h-8 w-8 rounded-full sm:mr-4"
          src="https://dummyimage.com/256x256/354ea1/ffffff&text=G"
        />

        <div className="flex w-full flex-col items-start lg:flex-row lg:justify-between">
          <p className="max-w-3xl">{message}</p>
          <div className="mt-4 flex flex-row justify-start gap-x-2 text-slate-500 lg:mt-0">
            <button className="hover:text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3"></path>
              </svg>
            </button>
            <button className="hover:text-blue-600" type="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3"></path>
              </svg>
            </button>
            <button className="hover:text-blue-600" type="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"></path>
                <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const RedwoodCopilot = () => {
  const [prompt, setPrompt] = useState('')
  const [currentPrompt, setCurrentPrompt] = useState('')
  const [prompts, setPrompts] = useState([])
  const [{ data, fetching, error }, executeQuery] = useQuery({
    query: RedwoodCopilotQuery,
    variables: { prompt },
  })

  const chat = () => {
    setPrompt(currentPrompt)
    executeQuery({ prompt: currentPrompt })
    console.log('fetching', fetching)
    setPrompts([
      ...prompts,
      { prompt: currentPrompt, message: data?.redwoodCopilot },
    ])
  }

  return (
    <>
      <Metadata title="Redwood Copilot" description="Redwood Copilot page" />

      <h1>Redwood Copilot</h1>
      <div className="container mx-auto my-8 flex flex-col bg-white">
        {error && <p>Error: {error.message}</p>}

        <div className="flex-1 overflow-y-auto">
          {prompts.map((prompt, index) => (
            <PromptMessageComponent
              key={index}
              prompt={prompt.prompt}
              message={prompt.message}
            />
          ))}
        </div>

        <div className="flex flex-col">
          <form className="sticky bottom-0 flex w-full items-center rounded-md bg-slate-200 p-2 dark:bg-slate-900">
            <label htmlFor="prompt" className="sr-only">
              Enter your prompt
            </label>

            <textarea
              id="prompt"
              rows={1}
              className="mx-2 flex min-h-full w-full rounded-md border border-slate-300 bg-slate-200 p-2 text-base text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:border-slate-300/20 dark:bg-slate-800 dark:text-slate-200 dark:placeholder-slate-400 dark:focus:border-blue-600 dark:focus:ring-blue-600"
              placeholder="Enter your prompt"
              onChange={(e) => setCurrentPrompt(e.target.value)}
            ></textarea>
            <div>
              <button
                className="inline-flex hover:text-blue-600 sm:p-2 dark:text-slate-200 dark:hover:text-blue-600"
                type="button"
                onClick={() => chat()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M10 14l11 -11"></path>
                  <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"></path>
                </svg>
                <span className="sr-only">Send message</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

// add urql provider
const RedwoodCopilotPage = () => (
  <StreamProvider>
    <RedwoodCopilot />
  </StreamProvider>
)

export default RedwoodCopilotPage
