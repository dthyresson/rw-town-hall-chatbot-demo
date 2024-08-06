const examplePrompts = [
  {
    title: 'Summary',
    prompt: 'What does this RedwoodJS app do?',
  },
  {
    title: 'GraphQL Streaming',
    prompt:
      'How does GraphQL streaming work with the @stream directive for chat queries?',
  },
  {
    title: 'Chatbot',
    prompt:
      'Explain how the chatbot UI in the RedwoodCopilot component works in this app? Show the code to send the prompt to the server.',
  },
  {
    title: 'Database',
    prompt: 'What database is this app using and describe the schema?',
  },
]

const ExamplePromptCards = ({ setPrompt }) => {
  return (
    <div className="relative overflow-x-auto py-4">
      <ul className="flex space-x-4 whitespace-nowrap">
        {examplePrompts.map((prompt) => (
          <li
            key={prompt.title}
            className="inline-block w-72 flex-shrink-0 rounded-lg bg-green-100 shadow transition-colors duration-300"
          >
            <button
              className="flex h-full w-full cursor-pointer flex-col items-center justify-center space-y-3 p-6 text-center"
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
                <h3 className="text-wrap text-sm font-medium text-green-800 transition-colors duration-300">
                  {prompt.title}
                </h3>
                <p className="mt-1 text-wrap text-sm text-green-700 transition-colors duration-300">
                  {prompt.prompt}
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ExamplePromptCards
