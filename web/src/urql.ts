import { createClient, fetchExchange } from 'urql'
export { Provider, gql as g, useQuery } from 'urql'

export const client = createClient({
  url: '/.redwood/functions/graphql',
  exchanges: [fetchExchange],
})
