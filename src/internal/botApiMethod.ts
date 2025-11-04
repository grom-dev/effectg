import type { Effect } from 'effect/Effect'
import type { BotApiError } from '../BotApiError'
import type { BotApiTransportError } from '../BotApiTransportError'
import type { MethodParams, MethodResults } from './botApiMethods.gen'

export interface BotApiMethod<M extends keyof MethodParams> {
  (params: MethodParams[M]): Effect<
    MethodResults[M],
    BotApiError | BotApiTransportError
  >
}
