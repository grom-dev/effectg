import type { Types } from '../bot-api'
import type { InputFile } from '../InputFile'
import type { FormattedText } from './FormattedText'

/**
 * Content of the message to be sent.
 *
 * @see https://core.telegram.org/tdlib/docs/classtd_1_1td__api_1_1_input_message_content.html
 */
export type InputMessageContent
  = | InputMessageText
    | InputMessagePhoto

/**
 * A text message.
 *
 * @see https://core.telegram.org/tdlib/docs/classtd_1_1td__api_1_1input_message_text.html
 */
export interface InputMessageText {
  type: 'text'
  text: FormattedText
  linkPreviewOptions?: Types.LinkPreviewOptions
}

/**
 * A photo message.
 *
 * @see https://core.telegram.org/tdlib/docs/classtd_1_1td__api_1_1input_message_photo.html
 */
export interface InputMessagePhoto {
  type: 'photo'
  photo: InputFile
  caption?: FormattedText
  showCaptionAboveMedia?: boolean
  hasSpoiler?: boolean
}
