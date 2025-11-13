import type { BotApiResponse, BotApiTransport } from '../BotApiTransport.ts'
import * as HttpBody from '@effect/platform/HttpBody'
import * as HttpClient from '@effect/platform/HttpClient'
import * as Effect from 'effect/Effect'
import { BotApiTransportError } from '../BotApiTransport.ts'

export const makeWith = (options: {
  makeUrl: (method: string) => URL
}): Effect.Effect<
  typeof BotApiTransport.Service,
  never,
  HttpClient.HttpClient
> => Effect.gen(function* () {
  const { makeUrl } = options
  const client = yield* HttpClient.HttpClient
  return {
    sendRequest: (method, params) => (
      Effect
        .gen(function* () {
          const url = makeUrl(method)
          // TODO: Serialize necessary parameters and handle file uploads.
          const body = yield* HttpBody.json(params)
          const response = yield* client.post(url, { body })
          const responseJson = yield* response.json
          return responseJson as BotApiResponse
        })
        .pipe(
          Effect.catchAll(error => (
            Effect.fail(new BotApiTransportError({ cause: error }))
          )),
        )
    ),
  }
})
