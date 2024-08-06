import React from 'react'

import avatarThinking from './avatars/rw-copilot-thinking.png'

interface ThinkingStatusProps {
  thinkingStatus: string
}

const thinkingStatuses = [
  'Photosynthesizing ideas...',
  'Growing neural branches...',
  'Calculating trunk circumference...',
  'Analyzing Redwood DNA...',
  'Consulting with wise old trees...',
  'Uploading forest knowledge...',
  'Debugging squirrel queries...',
  'Optimizing pinecone algorithms...',
  'Branching out for solutions...',
  'Rooting through data forests...',
]

export const getRandomThinkingStatus = () => {
  return thinkingStatuses[Math.floor(Math.random() * thinkingStatuses.length)]
}

export const ThinkingStatus: React.FC<ThinkingStatusProps> = ({
  thinkingStatus,
}) => (
  <div className="group block flex-shrink-0">
    <div className="flex animate-pulse items-center">
      <div>
        <img
          src={avatarThinking}
          alt="Redwood Copilot is thinking"
          className="h-24"
        />
      </div>
      <div className="ml-3 text-green-600">{thinkingStatus}</div>
    </div>
  </div>
)
