import type { MethodParams } from './botApiMethods.gen.js'
import type { FormattedText } from './formattedText.js'
import type { InputFile } from './inputFile.js'
import type { LinkPreview } from './linkPreview.js'
import * as Data from 'effect/Data'

/**
 * Content of a message to be sent.
 *
 * @see {@link https://core.telegram.org/tdlib/docs/classtd_1_1td__api_1_1_input_message_content.html td.td_api.InputMessageContent}
 */
export type MessageContent
  = | TextMessage
    | PhotoMessage

/**
 * Content of a text message.
 *
 * @see {@link https://core.telegram.org/tdlib/docs/classtd_1_1td__api_1_1input_message_text.html td.td_api.inputMessageText}
 */
export class TextMessage extends Data.TaggedClass('text')<{
  text: FormattedText
  linkPreview?: LinkPreview
}> {
  get sendParams(): Pick<MethodParams['sendMessage'], 'text' | 'entities' | 'parse_mode' | 'link_preview_options'> {
    return {
      ...this.text.sendParams,
      link_preview_options: this.linkPreview?.options ?? { is_disabled: true },
    }
  }
}

/**
 * Content of a photo message.
 *
 * @see {@link https://core.telegram.org/tdlib/docs/classtd_1_1td__api_1_1input_message_photo.html td.td_api.inputMessagePhoto}
 */
export class PhotoMessage extends Data.TaggedClass('photo')<{
  photo: InputFile
  caption?: FormattedText
  captionPosition?: 'above' | 'below'
  hasSpoiler?: boolean
}> {
  get sendParams(): Pick<MethodParams['sendPhoto'], 'photo' | 'caption' | 'caption_entities' | 'parse_mode' | 'show_caption_above_media' | 'has_spoiler'> {
    const {
      text: caption,
      entities: caption_entities,
      parse_mode,
    } = this.caption?.sendParams ?? {}
    return {
      photo: this.photo,
      caption,
      caption_entities,
      parse_mode,
      show_caption_above_media: this.captionPosition === 'above',
      has_spoiler: this.hasSpoiler,
    }
  }
}
