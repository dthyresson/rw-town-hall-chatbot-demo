import { customAlphabet } from 'nanoid'

/** Custom nanoid function with a specific alphabet */
export const nanoid = customAlphabet(
  '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
)

/** Object containing prefixes for different entity types */
const prefixes = {
  bucket: 'chat_completion',
  test: 'test', // <-- for tests only
} as const

/** Options for creating a new identifier */
type NewIdentifierOptions = {
  /** Whether to include a timestamp in the identifier to help with sorting */
  includeTimestamp?: boolean
}

/**
 * Generates a new unique identifier
 * @param prefix - The prefix for the identifier
 * @param options - Options for generating the identifier
 * @returns A string containing the new unique identifier
 */
export const newId = (
  prefix: keyof typeof prefixes,
  options?: NewIdentifierOptions
): string => {
  const includeTimestamp = options?.includeTimestamp ?? true
  const now = process.hrtime.bigint()
  const timestamp = includeTimestamp ? String(now) : ''
  return [prefixes[prefix], timestamp, nanoid(12)].join('_')
}
