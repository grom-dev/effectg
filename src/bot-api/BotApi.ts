import type { HttpClient } from '@effect/platform/HttpClient'
import type { BotApiShape } from './BotApiShape'
import type * as Types from './types.gen'
import * as HttpBody from '@effect/platform/HttpBody'
import * as Context from 'effect/Context'
import * as Effect from 'effect/Effect'
import { BotApiError } from './BotApiError'

export class BotApi extends Context.Tag('effectg/BotApi')<
  BotApi,
  BotApiShape
>() {}

export interface BotApiOptions {
  client: HttpClient
  token: string
  url?: 'prod' | 'test' | ((token: string, method: string) => URL)
}

export function make(options: BotApiOptions): BotApiShape {
  const {
    client,
    token,
    url = 'prod',
  } = options

  let makeUrl: (method: string) => URL
  if (typeof url === 'function') {
    makeUrl = method => url(token, method)
  }
  else if (url === 'prod') {
    makeUrl = method => new URL(`https://api.telegram.org/bot${token}/${method}`)
  }
  else if (url === 'test') {
    makeUrl = method => new URL(`https://api.telegram.org/bot${token}/test/${method}`)
  }

  const makeBody = (_method: string, params: unknown): HttpBody.HttpBody => {
    return HttpBody.unsafeJson(params)
  }

  const impl = new Proxy({}, {
    get: (_target, prop) => {
      if (typeof prop !== 'string') {
        return
      }
      const method = prop
      return (params: Record<string, unknown> = {}) => Effect.gen(function* () {
        const response = yield* client.post(makeUrl(method), {
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
          new BotApiError(
            payload.error_code,
            payload.description,
            payload.parameters,
          ),
        )
      })
    },
  })

  return impl as any
}
