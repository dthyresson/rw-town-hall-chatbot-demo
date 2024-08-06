// To access your database
// Append api/* to import from api and web/* to import from web
import { generateDocumentation } from 'api/src/lib/documentationGenerator/documentationGenerator'

export default async ({ args }) => {
  // Your script here...
  console.log(':: Executing script with args ::')
  console.log(args)
  await generateDocumentation()
  console.log(':: Documentation generated ::')
}
