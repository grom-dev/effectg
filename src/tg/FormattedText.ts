import type { MethodParams, Types } from '../bot-api'
import * as Data from 'effect/Data'

export type FormattedText
  = | Text
    | TextHtml
    | TextMarkdown

export class Text extends Data.Class<{
  plain: string
  entities?: Array<Types.MessageEntity>
}> {
  get sendParams(): SendParams {
    return { text: this.plain, entities: this.entities }
  }
}

export class TextHtml extends Data.Class<{ html: string }> {
  get sendParams(): SendParams {
    return { text: this.html, parse_mode: 'HTML' }
  }
}

export class TextMarkdown extends Data.Class<{ markdown: string }> {
  get sendParams(): SendParams {
    return { text: this.markdown, parse_mode: 'MarkdownV2' }
  }
}

type SendParams = Pick<MethodParams['sendMessage'], 'text' | 'entities' | 'parse_mode'>
