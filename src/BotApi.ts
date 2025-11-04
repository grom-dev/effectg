import type { BotApiShape } from './internal/botApiShape.gen'
import * as Context from 'effect/Context'
import * as Layer from 'effect/Layer'
import * as internal from './internal/botApi'

export class BotApi extends Context.Tag('@grom.js/effectg/BotApi')<
  BotApi,
  BotApiShape
>() {}

export const make = internal.make
export const layer = Layer.effect(BotApi, make)
