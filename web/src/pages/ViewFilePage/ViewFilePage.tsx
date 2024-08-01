import { BackwardIcon } from '@heroicons/react/24/outline'

import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import LoadFileCell from 'src/components/LoadFileCell'

type ViewFilePageProps = {
  path: string
}

const ViewFilePage = ({ path }: ViewFilePageProps) => {
  return (
    <div className="container mx-auto mt-12 w-full">
      <Metadata title="ViewFile" description="ViewFile page" />
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold">
          <Link to={routes.home()}>
            <BackwardIcon className="mr-6 inline-block h-6 w-6" />
          </Link>
          View File
        </h1>

        <p className="text-lg font-bold text-gray-800">{path}</p>
        <LoadFileCell path={path} />
      </div>
    </div>
  )
}

export default ViewFilePage
