import type * as Types from './botApiTypes.gen.js'

export type ReplyMarkup
  = | InlineKeyboard
    | ReplyKeyboard
    | ForceReply

/** @todo */
export class InlineKeyboard {
  get sendParams(): { reply_markup: Types.InlineKeyboardMarkup } {
    return {
      reply_markup: {
        inline_keyboard: [],
      },
    }
  }
}

/** @todo */
export class ReplyKeyboard {
  get sendParams(): { reply_markup: Types.ReplyKeyboardMarkup | Types.ReplyKeyboardRemove } {
    if (false) {
      return {
        reply_markup: {
          remove_keyboard: true,
        },
      }
    }
    return {
      reply_markup: {
        keyboard: [],
        // is_persistent
        // one_time_keyboard
        // resize_keyboard
        // input_field_placeholder
        // selective
      },
    }
  }
}

/** @todo */
export class ForceReply {
  get sendParams(): { reply_markup: Types.ForceReply } {
    return {
      reply_markup: {
        force_reply: true,
        // input_field_placeholder
        // selective
      },
    }
  }
}
