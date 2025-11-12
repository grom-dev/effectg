import type { BotApiTransport } from '../BotApiTransport.ts'
import type { BotApiShape } from './botApiShape.gen.ts'
import * as Effect from 'effect/Effect'
import { BotApiError } from '../BotApi.ts'

export const make = (options: {
  transport: typeof BotApiTransport.Service
}) => (
  Effect.gen(function* () {
    const botApi = new Proxy({}, {
      get: (_target, prop) => {
        if (typeof prop !== 'string') {
          return
        }
        const method = prop
        return (params: void | Record<string, unknown> = {}) => (
          Effect.gen(function* () {
            const response = yield* options.transport.sendRequest(method, params)
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
        )
      },
    })
    return botApi as BotApiShape
  })
)
