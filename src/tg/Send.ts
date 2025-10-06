import type { BotApi } from '../bot-api/BotApi'
import type { MessageContent } from './MessageContent'
import type { MessageDestination } from './MessageDestination'
import type { MessageReplyMarkup } from './MessageReplyMarkup'
import type { MessageSendOptions } from './MessageSendOptions'
import * as Match from 'effect/Match'

/**
 * Creates an effect that sends a message.
 */
export const sendMessage = ({ api, content, dest, markup, options }: {
  api: BotApi['Type']
  content: MessageContent
  dest: MessageDestination
  markup?: MessageReplyMarkup
  options?: MessageSendOptions
}) => {
  const rest = {
    ...dest.sendParams,
    ...markup?.sendParams,
    ...options?.sendParams,
  }
  return Match.value(content).pipe(
    Match.tag('text', content => api.sendMessage({ ...rest, ...content.sendParams })),
    Match.tag('photo', content => api.sendPhoto({ ...rest, ...content.sendParams })),
    Match.exhaustive,
  )
}
