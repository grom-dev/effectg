import type { MethodParams, Types } from '../bot-api'
import * as Data from 'effect/Data'

export class FormattedText extends Data.Class<{
  text: string
  entities?: Array<Types.MessageEntity>
  parseMode?: 'HTML' | 'MarkdownV2' | 'Markdown'
}> {
  get sendParams(): Pick<MethodParams['sendMessage'], 'text' | 'entities' | 'parse_mode'> {
    if (this.entities) {
      return { text: this.text, entities: this.entities }
    }
    if (this.parseMode) {
      return { text: this.text, parse_mode: this.parseMode }
    }
    return { text: this.text }
  }
}
