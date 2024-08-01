import {
  BoltIcon,
  CodeBracketIcon,
  SparklesIcon,
} from '@heroicons/react/20/solid'

import { Metadata } from '@redwoodjs/web'

import CodebaseCell from 'src/components/CodebaseCell'

const features = [
  {
    name: 'Codebase Generator',
    description: 'First we generate a file with your entire RedwoodJS project.',
    href: '#',
    icon: CodeBracketIcon,
  },
  {
    name: 'OpenAI',
    description:
      'We send that codebase to OpenAI and ask questions about it using our Redwood Copilot chatbot.',
    href: '#',
    icon: SparklesIcon,
  },
  {
    name: 'GraphQL Streaming',
    description:
      'Redwood Realtime with GraphQL Streaming will stream the response from OpenAI to the client.',
    href: '#',
    icon: BoltIcon,
  },
]

function Example() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className=" text-base font-semibold leading-7 text-green-600">
            Chatbot
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Redwood Copilot Demo
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            with OpenAI and GraphQL Streaming
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            This project demonstrates how to use RedwoodJS, OpenAI and GraphQL
            Streaming to build a Chatbot that can answer questions about your
            code.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon
                    aria-hidden="true"
                    className="h-5 w-5 flex-none text-green-600"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    <a
                      href={feature.href}
                      className="text-sm font-semibold leading-6 text-green-600"
                    >
                      Learn more <span aria-hidden="true">→</span>
                    </a>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

const HomePage = () => {
  return (
    <>
      <Metadata
        title="Redwood Copiliot Demo with OpenAI and GraphQL Streaming"
        description="Redwood Copiliot Demo with OpenAI and GraphQL Streaming"
      />

      <Example />
      <div className="mx-auto rounded-md border border-green-300 bg-green-100 p-4 lg:w-2/3">
        <CodebaseCell />
      </div>
    </>
  )
}

export default HomePage
