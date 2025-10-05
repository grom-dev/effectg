import type { Types } from '../bot-api'

export type FormattedText
  = | { text: string }
    | { text: string, parseMode: 'HTML' | 'MarkdownV2' | 'Markdown' }
    | { text: string, entities: Array<Types.MessageEntity> }
