import type { MethodParams } from './BotApi.ts'
import type { InputFile } from './InputFile.ts'
import type { LinkPreview } from './LinkPreview.ts'
import type { Text as Text$ } from './Text.ts'
import * as Data from 'effect/Data'
import * as Option from 'effect/Option'

/**
 * Content of a message to be sent.
 *
 * @see {@link https://core.telegram.org/tdlib/docs/classtd_1_1td__api_1_1_input_message_content.html td.td_api.InputMessageContent}
 */
export type Content
  = | Text
    | Photo

/**
 * Content of a text message.
 *
 * @see {@link https://core.telegram.org/tdlib/docs/classtd_1_1td__api_1_1input_message_text.html td.td_api.inputMessageText}
 */
export class Text extends Data.TaggedClass('text')<{
  text: Text$
  linkPreview: Option.Option<LinkPreview>
}> {
  sendParams(): Pick<MethodParams['sendMessage'], 'text' | 'entities' | 'parse_mode' | 'link_preview_options'> {
    return {
      ...this.text.sendParams(),
      link_preview_options: Option.match(this.linkPreview, {
        onNone: () => ({ is_disabled: true }),
        onSome: lp => lp.options(),
      }),
    }
  }
}

/**
 * Content of a photo message.
 *
 * @see {@link https://core.telegram.org/tdlib/docs/classtd_1_1td__api_1_1input_message_photo.html td.td_api.inputMessagePhoto}
 */
export class Photo extends Data.TaggedClass('photo')<{
  file: InputFile
  caption: Option.Option<Text>
  layout: 'caption-above' | 'caption-below'
  hideWithSpoiler: boolean
}> {
  sendParams(): Pick<MethodParams['sendPhoto'], 'photo' | 'caption' | 'caption_entities' | 'parse_mode' | 'show_caption_above_media' | 'has_spoiler'> {
    const {
      text: caption,
      entities: caption_entities,
      parse_mode,
    } = Option.match(this.caption, {
      onNone: () => ({} as Partial<ReturnType<Text$['sendParams']>>),
      onSome: caption => caption.sendParams(),
    })
    return {
      photo: this.file,
      caption,
      caption_entities,
      parse_mode,
      show_caption_above_media: this.layout === 'caption-above',
      has_spoiler: this.hideWithSpoiler,
    }
  }
}
