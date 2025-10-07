import type { HttpClient } from '@effect/platform/HttpClient'
import type { HttpClientError } from '@effect/platform/HttpClientError'
import type { Effect } from 'effect/Effect'
import type { BotApiError } from './botApiError'
import type { MethodParams, MethodResults } from './methods.gen'

export interface BotApiMethod<M extends keyof MethodParams> {
  (params: MethodParams[M]): Effect<
    MethodResults[M],
    HttpClientError | BotApiError,
    HttpClient
  >
}
