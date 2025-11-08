import type { BotApiShape } from './internal/botApiShape.gen.js'
import * as Context from 'effect/Context'
import * as internal from './internal/botApi.js'

export type { MethodParams, MethodResults } from './internal/botApiMethods.gen.js'
export type * as Types from './internal/botApiTypes.gen.js'

export class BotApi extends Context.Tag('@grom.js/effectg/BotApi')<
  BotApi,
  BotApiShape
>() {}

export const make = internal.make
