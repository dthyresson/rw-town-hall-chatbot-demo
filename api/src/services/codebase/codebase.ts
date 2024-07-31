import { generate } from 'src/lib/codebaseGenerator/codebaseGenerator'
import type { GenCodebaseArgs } from 'src/lib/codebaseGenerator/codebaseGenerator'

export const generateCodebase = async (args: GenCodebaseArgs) => {
  return await generate(args)
}
