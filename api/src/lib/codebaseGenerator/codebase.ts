import fs from 'fs'
import path from 'path'

import { getPaths } from '@redwoodjs/internal'

import { logger } from 'src/lib/logger'

export const CODEBASE = 'CODEBASE_TOC.md'

export const readCodebaseFile = (filePathToRead?: string) => {
  const paths = getPaths()
  const filePath = path.join(paths.base, filePathToRead || CODEBASE)
  logger.debug({ filePath }, 'Reading file')
  return fs.readFileSync(filePath, 'utf-8')
}
