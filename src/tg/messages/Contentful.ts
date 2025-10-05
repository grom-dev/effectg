import type { InputMessageContent } from '../InputMessageContent'

export const messageContent = Symbol.for('effectg/messageContent')

export interface Contentful {
  [messageContent]: () => InputMessageContent
}
