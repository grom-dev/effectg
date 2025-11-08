import type { Effect } from 'effect/Effect'
import type { BotApiError } from '../BotApiError.js'
import type { BotApiTransportError } from '../BotApiTransportError.js'
import type { MethodParams, MethodResults } from './botApiMethods.gen.js'

export interface BotApiMethod<M extends keyof MethodParams> {
  (params: MethodParams[M]): Effect<
    MethodResults[M],
    BotApiError | BotApiTransportError
  >
}
