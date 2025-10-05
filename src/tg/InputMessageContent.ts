import type { MethodParams } from '../bot-api'
import type { InputFile } from '../InputFile'
import type { FormattedText } from './FormattedText'
import type { LinkPreview } from './messages/LinkPreview'
import * as Data from 'effect/Data'

/**
 * Content of a message to be sent.
 *
 * @see https://core.telegram.org/tdlib/docs/classtd_1_1td__api_1_1_input_message_content.html
 */
export type InputMessageContent
  = | InputMessageText
    | InputMessagePhoto

/**
 * Content of a text message.
 *
 * @see https://core.telegram.org/tdlib/docs/classtd_1_1td__api_1_1input_message_text.html
 */
export class InputMessageText extends Data.TaggedClass('text')<{
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
 * @see https://core.telegram.org/tdlib/docs/classtd_1_1td__api_1_1input_message_photo.html
 */
export class InputMessagePhoto extends Data.TaggedClass('photo')<{
  photo: InputFile
  caption?: FormattedText
  showCaptionAboveMedia?: boolean
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
      show_caption_above_media: this.showCaptionAboveMedia,
      has_spoiler: this.hasSpoiler,
    }
  }
}
