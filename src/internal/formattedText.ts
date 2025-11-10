import type { MethodParams } from './botApiMethods.gen.js'
import type * as Types from './botApiTypes.gen.js'
import * as Data from 'effect/Data'

export type FormattedText
  = | Text
    | TextHtml
    | TextMarkdown

export class Text extends Data.Class<{
  text: string
  entities?: Array<Types.MessageEntity>
}> {
  get sendParams(): SendParams {
    return { text: this.text, entities: this.entities }
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
