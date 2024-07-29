import { Metadata } from '@redwoodjs/web'

import { StreamProvider, useQuery, g } from 'src/StreamProvider'

const AlphabetQuery = g(`
  query AlphabetQuery {
    alphabet @stream
  }`)

const Alphabet = () => {
  const [{ data, fetching, error }] = useQuery({ query: AlphabetQuery })
  return (
    <>
      <Metadata title="Alphabet" description="Alphabet page" />

      <h1>Alphabet</h1>
      {fetching && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data?.alphabet ? (
        <div className="container mx-auto flex w-1/2 flex-col space-y-4">
          <p>
            <span className="pr-2 font-bold">ABC:</span>
            {data.alphabet}
          </p>

          <div className="h-4 w-full rounded-full bg-gray-200">
            <div
              className="h-4 rounded-full bg-blue-600"
              style={{ width: `${(data.alphabet.length / 26) * 100}%` }}
            ></div>
            <p className="mt-4 text-right">
              {data.alphabet.length == 26
                ? 'Done!'
                : `${26 - data.alphabet.length} to
            go`}
            </p>
          </div>
        </div>
      ) : (
        <p>No data</p>
      )}
    </>
  )
}

// add urql provider
const AlphabetPage = () => (
  <StreamProvider>
    <Alphabet />
  </StreamProvider>
)

export default AlphabetPage
