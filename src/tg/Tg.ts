import type { MethodParams } from '../bot-api'
import type { FormattedText } from './FormattedText'
import type {
  InputMessageContent,
  InputMessagePhoto,
  InputMessageText,
} from './InputMessageContent'
import * as Context from 'effect/Context'
import * as Effect from 'effect/Effect'
import { BotApi } from '../bot-api/BotApi'

export class Tg extends Context.Tag('effectg/Tg')<
  Tg,
  TgShape
>() {}

export interface TgShape {
  send: typeof send
  reply: 'todo'
}

/** @todo */
export const send = (
  content: InputMessageContent,
  chat_id: number | string,
) => Effect.gen(function* () {
  const api = yield* BotApi
  switch (content.type) {
    case 'text':
      return yield* api.sendMessage({
        chat_id,
        ...optsMessageText(content),
      })
    case 'photo':
      return yield* api.sendPhoto({
        chat_id,
        ...optsMessagePhoto(content),
      })
  }
})

function optsMessageText(msg: InputMessageText): Pick<
  MethodParams['sendMessage'],
  'text' | 'entities' | 'parse_mode' | 'link_preview_options'
> {
  return {
    ...optsFormattedText(msg.text),
    link_preview_options: msg.linkPreviewOptions,
  }
}

function optsMessagePhoto(msg: InputMessagePhoto): Pick<
  MethodParams['sendPhoto'],
  'photo' | 'caption' | 'caption_entities' | 'parse_mode' | 'show_caption_above_media' | 'has_spoiler'
> {
  const { text, entities, parse_mode } = msg.caption ? optsFormattedText(msg.caption) : {}
  return {
    photo: msg.photo,
    caption: text,
    caption_entities: entities,
    parse_mode,
    show_caption_above_media: msg.showCaptionAboveMedia,
    has_spoiler: msg.hasSpoiler,
  }
}

function optsFormattedText(fmt: FormattedText) {
  if ('parseMode' in fmt) {
    return { text: fmt.text, parse_mode: fmt.parseMode }
  }
  if ('entities' in fmt) {
    return { text: fmt.text, entities: fmt.entities }
  }
  return { text: fmt.text }
}
