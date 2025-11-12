import type { Effect } from 'effect/Effect'
import type { BotApiError } from '../BotApi.ts'
import type { BotApiTransportError } from '../BotApiTransport.ts'
import type { MethodParams, MethodResults } from './botApiMethods.gen.ts'

export interface BotApiMethod<M extends keyof MethodParams> {
  (params: MethodParams[M]): Effect<
    MethodResults[M],
    BotApiError | BotApiTransportError
  >
}
