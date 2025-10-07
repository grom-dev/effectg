import type * as HttpBody from '@effect/platform/HttpBody'
import type { BotApi } from './botApi.gen'
import type * as Types from './types.gen'
import * as HttpClient from '@effect/platform/HttpClient'
import * as Effect from 'effect/Effect'
import { BotApiError } from './botApiError'

export const make = ({ makeUrl, makeBody }: {
  makeUrl: (method: string) => URL
  makeBody: (method: string, params: unknown) => HttpBody.HttpBody
}) => new Proxy({}, {
  get: (_target, prop) => {
    if (typeof prop !== 'string') {
      return
    }
    const method = prop
    return (params: void | Record<string, unknown> = {}) =>
      Effect.gen(function* () {
        const response = yield* HttpClient.post(makeUrl(method), {
          body: makeBody(method, params),
        })

        // https://core.telegram.org/bots/api#making-requests
        const payload = (yield* response.json) as (
          | { ok: true, result: any, description?: string }
          | { ok: false, error_code: number, description: string, parameters?: Types.ResponseParameters }
        )

        if (payload.ok) {
          return payload.result
        }

        yield* Effect.fail(
          new BotApiError({
            code: payload.error_code,
            description: payload.description,
            parameters: payload.parameters,
          }),
        )
      })
  },
}) as BotApi
