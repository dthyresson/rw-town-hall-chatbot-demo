import type { GenerateCodebaseResolver } from 'types/codebase'
import type { GenCodebaseInput } from 'types/shared-schema-types'

import { generate } from 'src/lib/codebaseGenerator/codebaseGenerator'

export const generateCodebase: GenerateCodebaseResolver = async ({
  args,
}: {
  args: GenCodebaseInput
}) => {
  return await generate(args)
}
