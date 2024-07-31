import fs from 'fs'
import path from 'path'

import { getPaths } from '@redwoodjs/internal'

import { logger } from 'src/lib/logger'

export const CODEBASE = 'CODEBASE_TOC.md'

export const readCodebaseFile = () => {
  const paths = getPaths()
  const filePath = path.join(paths.base, CODEBASE)
  logger.debug({ filePath }, 'Reading codebase file')
  return fs.readFileSync(filePath, 'utf-8')
}
