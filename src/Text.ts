import type { MethodParams, Types } from './BotApi.ts'
import * as Data from 'effect/Data'

/**
 * Formatted text.
 */
export type Text
  = | Plain
    | Html
    | Markdown

export class Plain extends Data.Class<{
  text: string
  entities?: Array<Types.MessageEntity>
}> {
  sendParams(): SendParams {
    return { text: this.text, entities: this.entities }
  }
}

export class Html extends Data.Class<{ html: string }> {
  sendParams(): SendParams {
    return { text: this.html, parse_mode: 'HTML' }
  }
}

export class Markdown extends Data.Class<{ markdown: string }> {
  sendParams(): SendParams {
    return { text: this.markdown, parse_mode: 'MarkdownV2' }
  }
}

type SendParams = Pick<MethodParams['sendMessage'], 'text' | 'entities' | 'parse_mode'>
