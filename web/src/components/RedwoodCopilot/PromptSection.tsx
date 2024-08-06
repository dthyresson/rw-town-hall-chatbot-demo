import redwoodDeveloperIcon from './avatars/rw-developer.png'

const PromptSection = ({ prompt }: { prompt: string }) => {
  return (
    <div className="text-md rounded-md border border-solid border-gray-300 bg-gray-200 p-4 text-gray-900">
      <div className="mb-4 flex justify-center">
        <img
          src={redwoodDeveloperIcon}
          alt="Redwood Developer"
          aria-hidden="true"
          className="h-10 w-10 rounded-full bg-green-100 p-1 ring-2 ring-gray-500"
        />
      </div>
      <div className="text-md rounded-md border border-solid border-gray-300 bg-gray-100 p-4 text-gray-900">
        {prompt}
      </div>
    </div>
  )
}

export default PromptSection
