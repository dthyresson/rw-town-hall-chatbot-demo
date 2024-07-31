import { generateCodebase } from 'api/src/lib/codebaseGenerator/codebaseGenerator'
import * as dotenv from 'dotenv'

dotenv.config()

interface GenCodebaseArgs {
  upload?: boolean
}

export default async (
  {
    args,
  }: {
    args?: GenCodebaseArgs
  } = { args: { upload: false } }
) => {
  await generateCodebase(args)
}
