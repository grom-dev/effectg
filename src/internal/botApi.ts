import type { BotApiShape } from './botApiShape.gen'
import * as Effect from 'effect/Effect'
import { BotApiError } from '../BotApiError'
import { BotApiTransport } from '../BotApiTransport'

export const make = Effect.gen(function* () {
  const transport = yield* BotApiTransport
  const botApi = new Proxy({}, {
    get: (_target, prop) => {
      if (typeof prop !== 'string') {
        return
      }
      const method = prop
      return (params: void | Record<string, unknown> = {}) =>
        Effect.gen(function* () {
          const response = yield* transport.sendRequest(method, params)
          if (response.ok) {
            return response.result
          }
          yield* Effect.fail(
            new BotApiError({
              code: response.error_code,
              description: response.description,
              parameters: response.parameters,
            }),
          )
        })
    },
  })
  return botApi as BotApiShape
})
