import type { BotApi } from '../bot-api/BotApi'
import type { InputMessageContent } from './InputMessageContent'
import type { MessageDestination } from './MessageDestination'
import type { Contentful } from './messages/Contentful'
import * as Context from 'effect/Context'
import * as Match from 'effect/Match'
import { contentSymbol } from './messages/Contentful'

export class Tg extends Context.Tag('effectg/Tg')<Tg, TgShape>() {}

export interface TgShape {
  send: 'todo'
  reply: 'todo'
}

/**
 * Creates an effect that sends a message.
 */
export const makeSend = ({
  api,
  content: contentful,
  dest,
}: {
  api: BotApi['Type']
  content: InputMessageContent | Contentful
  dest: MessageDestination
}) => {
  const content = contentSymbol in contentful
    ? contentful[contentSymbol]()
    : contentful
  const rest = {
    ...dest.sendParams,
  }
  return Match.value(content).pipe(
    Match.tag('text', content => api.sendMessage({ ...rest, ...content.sendParams })),
    Match.tag('photo', content => api.sendPhoto({ ...rest, ...content.sendParams })),
    Match.exhaustive,
  )
}
