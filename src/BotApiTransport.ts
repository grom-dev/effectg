import type * as Effect from 'effect/Effect'
import type { BotApiTransportError } from './BotApiTransportError'
import type * as Types from './internal/botApiTypes.gen'
import { Layer } from 'effect'
import * as Context from 'effect/Context'
import * as internal from './internal/botApiTransport'

export class BotApiTransport extends Context.Tag('@grom.js/effectg/BotApiTransport')<
  BotApiTransport,
  {
    sendRequest: (
      method: string,
      params: unknown,
    ) => Effect.Effect<BotApiResponse, BotApiTransportError>
  }
>() {
}

/**
 * @see https://core.telegram.org/bots/api#making-requests
 */
export type BotApiResponse
  = {
    ok: true
    result: unknown
    description?: string
  } | {
    ok: false
    error_code: number
    description: string
    parameters?: Types.ResponseParameters
  }

export const makeWith = internal.makeWith

export const layerProd = (token: string) => Layer.effect(
  BotApiTransport,
  makeWith({
    makeUrl: method => new URL(`https://api.telegram.org/bot${token}/${method}`),
  }),
)

export const layerTest = (token: string) => Layer.effect(
  BotApiTransport,
  makeWith({
    makeUrl: method => new URL(`https://api.telegram.org/bot${token}/test/${method}`),
  }),
)
