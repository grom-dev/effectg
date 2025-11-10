import type { Chat } from './chat.js'
import type { MessageContent } from './messageContent.js'
import type { ReplyMarkup } from './replyMarkup.js'
import type { SendOptions } from './sendOptions.js'
import * as Effect from 'effect/Effect'
import * as Match from 'effect/Match'
import { BotApi } from '../BotApi.js'

/**
 * Creates an effect that sends a message.
 *
 * @todo Add support for reply options.
 */
export const sendMessage = ({ chat, content, markup, options }: {
  chat: Chat
  content: MessageContent
  markup?: ReplyMarkup
  options?: SendOptions
}) => {
  const rest = {
    ...chat.sendParams,
    ...markup?.sendParams,
    ...options?.sendParams,
  }
  return BotApi.pipe(
    Effect.andThen(api =>
      Match.value(content).pipe(
        Match.tag('text', content => api.sendMessage({ ...rest, ...content.sendParams })),
        Match.tag('photo', content => api.sendPhoto({ ...rest, ...content.sendParams })),
        Match.exhaustive,
      ),
    ),
  )
}
