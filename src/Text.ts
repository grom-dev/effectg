import type { TgxElement } from '@grom.js/tgx/types'
import type { MethodParams, Types } from './BotApi.ts'
import { html as tgxToHtml } from '@grom.js/tgx'
import * as Data from 'effect/Data'

/**
 * Formatted text.
 */
export type Text
  = | Plain
    | Html
    | Markdown
    | Tgx

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

export class Tgx extends Data.Class<{ tgx: TgxElement }> {
  sendParams(): SendParams {
    return { text: tgxToHtml(this.tgx), parse_mode: 'HTML' }
  }
}

type SendParams = Pick<MethodParams['sendMessage'], 'text' | 'entities' | 'parse_mode'>
