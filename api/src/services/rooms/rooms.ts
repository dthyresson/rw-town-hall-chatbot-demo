import type { SendMessageInput } from 'types/graphql'

import { logger } from 'src/lib/logger'
import type { NewMessageChannelType } from 'src/subscriptions/newMessage/newMessage'

export const room = ({ id }) => [id]

export const rooms = () => {
  return [1, 2, 3, 4]
}

export const sendMessage = async (
  { input }: { input: SendMessageInput },
  { context }: { context: { pubSub: NewMessageChannelType } }
) => {
  logger.debug({ input }, 'sending message ....')

  const { roomId, from, body } = input

  context.pubSub.publish('newMessage', roomId, { from, body })

  return input
}
