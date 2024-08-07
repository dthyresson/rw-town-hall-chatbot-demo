import type {
  LoadFileResolver,
  GenerateCodebaseResolver,
  CodebaseResolver,
} from 'types/codebase'
import type { GenCodebaseInput } from 'types/shared-schema-types'

import { readCodebaseFile, readFile } from 'src/lib/codebaseGenerator/codebase'
import { generate } from 'src/lib/codebaseGenerator/codebaseGenerator'

export const generateCodebase: GenerateCodebaseResolver = async ({
  args,
}: {
  args: GenCodebaseInput
}) => {
  return await generate(args)
}

export const codebase: CodebaseResolver = async () => {
  return await readCodebaseFile()
}

export const loadFile: LoadFileResolver = async ({ path }) => {
  return await readFile(path)
}
