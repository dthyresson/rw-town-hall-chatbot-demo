import { Provider, client } from './urql'
export { g, useQuery } from './urql'

export const StreamProvider = ({ children }: { children: React.ReactNode }) => (
  <Provider value={client}>{children}</Provider>
)
