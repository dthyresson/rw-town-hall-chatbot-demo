import * as fs from 'fs'

import fg from 'fast-glob'

import { getConfig, getPaths } from '@redwoodjs/project-config'

import {
  LANGBASE_API_KEY,
  LANGBASE_MEMORY_DOCUMENTS_ENDPOINT,
} from 'src/lib/langbase/langbase'
import { logger } from 'src/lib/logger'

export const CODEBASE_FILENAME = 'CODEBASE_TOC.md'

const getSignedUploadUrl = async () => {
  if (!LANGBASE_API_KEY) {
    throw new Error('LANGBASE_API_KEY is not set in the environment variables')
  }

  const memoryName = process.env.LANGBASE_MEMORY_NAME
  const ownerLogin = process.env.LANGBASE_OWNER_LOGIN

  if (!memoryName || !ownerLogin) {
    throw new Error(
      'LANGBASE_MEMORY_NAME and LANGBASE_OWNER_LOGIN must be set in the environment variables'
    )
  }

  const newDoc = {
    memoryName,
    ownerLogin,
    fileName: CODEBASE_FILENAME,
  }

  logger.info('Creating new document in Langbase:', newDoc)
  logger.info('URL:', LANGBASE_MEMORY_DOCUMENTS_ENDPOINT)
  logger.info('API Key:', LANGBASE_API_KEY)

  const response = await fetch(LANGBASE_MEMORY_DOCUMENTS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${LANGBASE_API_KEY}`,
    },
    body: JSON.stringify(newDoc),
  })

  const signedUploadUrl = await response.json()

  return signedUploadUrl
}

const uploadDocument = async (signedUrl, filePath) => {
  const file = fs.readFileSync(filePath, 'utf-8')
  logger.info({ signedUrl }, 'Uploading document to Langbase')
  try {
    const response = await fetch(signedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'text/markdown',
      },
      body: file,
    })

    return response
  } catch (error) {
    logger.error({ error }, 'Error uploading document to Langbase')
    throw error
  }
}

const getRedwoodAppTitle = (): string => {
  const config = getConfig()
  return config.web.title ?? 'Redwood App'
}

const getCodeFiles = async (): Promise<string[]> => {
  const paths = getPaths()

  const rwFiles = fg.globSync(['redwood.toml', 'README.md'])
  const dbFiles = fg.globSync(`${paths.api.db}/**/*.prisma`)
  const graphQLFiles = fg.globSync([
    `${paths.generated.schema}`,
    `${paths.api.graphql}/**/*.{ts,js}`,
  ])
  const apiFiles = fg.globSync(`${paths.api.src}/**/*.{ts,js,tsx,jsx}`)
  const webFiles = fg.globSync(`${paths.web.src}/**/*.{ts,js,tsx,jsx}`)
  return [...rwFiles, ...dbFiles, ...graphQLFiles, ...apiFiles, ...webFiles]
}

const createMarkdownTOC = (files: string[]): string => {
  const appTitle = getRedwoodAppTitle()
  const toc = [`#  ${appTitle} - Codebase Table of Contents`]
  const paths = getPaths()
  const sections = {
    'README.md': '## Readme',
    'redwood.toml': '## Redwood Config',
    API: {
      [paths.generated.schema]: '### GraphQL Schema',
      [paths.api.db]: '### DB',
      [paths.api.src + '/server.ts']: '### Server',
      [paths.api.src + '/lib']: '### Lib',
      [paths.api.src + '/graphql']: '### GraphQL',
      [paths.api.src + '/services']: '### Services',
      [paths.api.src + '/directives']: '### GraphQL -> Directives',
      [paths.api.src + '/subscriptions']: '### GraphQL -> Subscriptions',
    },
    Web: {
      [paths.web.src + '/Routes.tsx']: '### Routes',
      [paths.web.src + '/layouts']: '### Layouts',
      [paths.web.src + '/pages']: '### Pages',
      [paths.web.src + '/components']: '### Components',
      [paths.web.src + '/App.tsx']: '### App',
    },
  }

  for (const [section, content] of Object.entries(sections)) {
    if (typeof content === 'string') {
      toc.push(`\n${content}\n`)
      const sectionFiles = files.filter((file) => file === section)
      addFilesToTOC(sectionFiles, toc)
    } else {
      toc.push(`\n## ${section}\n`)
      for (const [dir, heading] of Object.entries(content)) {
        const sectionFiles = files.filter((file) => file.startsWith(dir))
        if (sectionFiles.length > 0) {
          toc.push(`${heading}\n`)
          addFilesToTOC(sectionFiles, toc)
        }
      }
    }
  }

  return toc.join('\n')
}

const addFilesToTOC = (sectionFiles: string[], toc: string[]) => {
  const paths = getPaths()
  sectionFiles.forEach((file) => {
    const relativePath = file.replace(paths.base + '/', '')
    logger.debug(`Adding ${relativePath} to TOC`)
    toc.push(`#### ${relativePath}\n`)
    const content = fs.readFileSync(file, 'utf-8')
    const fileExtension = file.split('.').pop()
    toc.push(
      `\`\`\`${fileExtension} file="${relativePath}"\n${content}\n\`\`\`\n`
    )
  })
}

export interface GenCodebaseArgs {
  upload?: boolean
}

export const generate = async (args: GenCodebaseArgs) => {
  logger.info(':: Generating codebase table of contents ::')

  const files = await getCodeFiles()
  const tocContent = createMarkdownTOC(files)

  fs.writeFileSync(CODEBASE_FILENAME, tocContent)
  // logger.info(
  //   { tocContent, CODEBASE_FILENAME },
  //   `:: Table of contents generated ::`
  // )

  if (args.upload) {
    const { signedUrl } = await getSignedUploadUrl()

    if (signedUrl) {
      logger.info(':: Uploading table of contents to Langbase ::')
      await uploadDocument(signedUrl, CODEBASE_FILENAME)
    } else {
      logger.error(
        ':: Failed to get signed URL for uploading table of contents to Langbase ::'
      )
    }
  }

  return true
}
