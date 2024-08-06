import { useState } from 'react'

import { StreamProvider, g, useQuery } from 'src/StreamProvider'

import ChatForm from './ChatForm'
import ChatResponseSection from './ChatResponseSection'
import ExamplePromptCards from './ExamplePromptCards'
import PromptSection from './PromptSection'
import { ThinkingStatus, getRandomThinkingStatus } from './ThinkingStatus'

const ChatQuery = g(`
  query ChatQuery($input: ChatInput!) {
    chat(input: $input) @stream {
      id
      message
      prompt
    }
  }`)

const debug = false

const RedwoodCopilotComponent = () => {
  const [prompt, setPrompt] = useState('')
  const [thinkingStatus, setThinkingStatus] = useState('')
  const [provider, setProvider] = useState('OPENAI')

  const [{ data, fetching, error }, executeQuery] = useQuery({
    query: ChatQuery,
    variables: {
      input: { prompt, debug, provider },
    },
    pause: true,
  })

  const handleSend = () => {
    const promptValue = prompt.trim()
    if (promptValue) {
      setThinkingStatus(getRandomThinkingStatus())
      executeQuery()
    }
  }

  return (
    <main className="container mx-auto flex h-screen w-full flex-col">
      {error && <div>Error: {error.message}</div>}
      <div className="flex-grow overflow-auto px-4 ">
        <ExamplePromptCards setPrompt={setPrompt} />
        <div className="space-y-2">
          {(fetching || (data && data.chat.length === 0)) && (
            <ThinkingStatus thinkingStatus={thinkingStatus} />
          )}
          {data && data.chat.length > 0 && (
            <div className="space-y-4">
              <PromptSection prompt={data.chat[0].prompt} />
              <ChatResponseSection data={data} />
            </div>
          )}
        </div>
      </div>

      <ChatForm
        prompt={prompt}
        setPrompt={setPrompt}
        provider={provider}
        setProvider={setProvider}
        handleSend={handleSend}
        fetching={fetching}
      />
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
