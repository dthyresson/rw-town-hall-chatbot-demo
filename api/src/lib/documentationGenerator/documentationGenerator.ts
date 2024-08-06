import crypto from 'crypto'
import fs from 'fs'
import path from 'path'

import fg from 'fast-glob'

import { getSignedUploadUrl, uploadDocument } from 'src/lib/langbase'
import { logger } from 'src/lib/logger'

const HASH_FILE = 'doc_hashes.json'

const generateDocumentHash = (filePath: string): string => {
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  return crypto.createHash('md5').update(fileContent).digest('hex')
}

export const generateDocumentation = async () => {
  const docsPath = process.env.REDWOOD_DOCS_PATH
  logger.info({ docsPath }, 'Generating documentation')

  // Load existing hashes
  let existingHashes = {}
  try {
    const hashContent = fs.readFileSync(HASH_FILE, 'utf-8')
    existingHashes = JSON.parse(hashContent)
  } catch (error) {
    logger.info('No existing hash file found. Creating a new one.')
  }

  // Find all markdown files
  const filepaths = await fg(['**/*.md', '**/*.mdx'], { cwd: `${docsPath}` })

  // Process each file
  for (const filepath of filepaths) {
    const name = filepath.split('/').join('-')
    const fullPath = path.join(docsPath, filepath)

    // Calculate hash of file contents
    const hash = generateDocumentHash(fullPath)

    if (existingHashes[name] !== hash) {
      logger.info({ name, filepath: fullPath }, 'File changed, uploading')

      const signedUrlResponse = await getSignedUploadUrl({
        fileName: name,
        memory: process.env.LANGBASE_MEMORY_NAME_DOCS,
      })
      const signedUrl = signedUrlResponse.signedUrl

      const response = await uploadDocument({
        signedUrl,
        filePath: fullPath,
        contentType: 'text/markdown',
      })
      logger.info({ response, name, path: fullPath }, 'Uploaded file')

      // Update hash immediately after successful upload
      existingHashes[name] = hash
      fs.writeFileSync(HASH_FILE, JSON.stringify(existingHashes, null, 2))
      logger.info({ name }, 'Updated hash after successful upload')
    } else {
      logger.info({ name, filepath: fullPath }, 'File unchanged, skipping')
    }
  }

  logger.info(':: Documentation generation and upload complete ::')
}
