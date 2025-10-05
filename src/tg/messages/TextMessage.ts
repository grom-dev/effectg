import type { FormattedText } from '../FormattedText'
import type { InputMessageText } from '../InputMessageContent'
import type { Contentful } from './Contentful'
import { messageContent } from './Contentful'
import { LinkPreview } from './LinkPreview'

/**
 * @todo How to modify text and link preview?
 */
export class TextMessage implements Contentful {
  protected readonly text: FormattedText
  protected readonly lp: LinkPreview

  constructor(text: FormattedText) {
    this.text = text
    this.lp = new LinkPreview()
  }

  [messageContent](): InputMessageText {
    return {
      type: 'text',
      text: this.text,
      linkPreviewOptions: this.lp.options,
    }
  }
}
