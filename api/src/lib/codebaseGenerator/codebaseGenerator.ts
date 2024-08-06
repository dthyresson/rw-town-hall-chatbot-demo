import * as fs from 'fs'
import * as path from 'path'

import fg from 'fast-glob'
import type { GenCodebaseInput } from 'types/shared-schema-types'

import { getConfig, getPaths } from '@redwoodjs/project-config'

import { getSignedUploadUrl, uploadDocument } from 'src/lib/langbase'
import { logger } from 'src/lib/logger'

const CODEBASE_FILENAME = path.join(
  getPaths().base,
  '.rw-chatbot',
  'CODEBASE_TOC.md'
)

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
      [paths.web.src + '/StreamProvider.tsx']: '### Stream Provider',
      [paths.web.src + '/urql.ts']: '### Urql GraphQL Client',
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
    // logger.debug(`Adding ${relativePath} to TOC`)
    toc.push(`#### ${relativePath}\n`)
    const content = fs.readFileSync(file, 'utf-8')
    const fileExtension = file.split('.').pop()
    toc.push(
      `\`\`\`${fileExtension} file="${relativePath}"\n${content}\n\`\`\`\n`
    )
  })
}

export const generate = async (args?: GenCodebaseInput) => {
  logger.info(':: Generating codebase table of contents ::')

  const files = await getCodeFiles()
  const tocContent = createMarkdownTOC(files)
  const fileName = CODEBASE_FILENAME
  fs.writeFileSync(fileName, tocContent)

  if (args?.upload) {
    const { signedUrl } = await getSignedUploadUrl({
      fileName,
      memory: process.env.LANGBASE_MEMORY_NAME_CODEBASE,
    })

    if (signedUrl) {
      logger.info(':: Uploading table of contents to Langbase ::')
      await uploadDocument({
        signedUrl,
        filePath: fileName,
        contentType: 'text/markdown',
      })
    } else {
      logger.error(
        ':: Failed to get signed URL for uploading table of contents to Langbase ::'
      )
    }
  }

  return true
}
