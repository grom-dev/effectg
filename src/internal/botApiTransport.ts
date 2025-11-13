import type { BotApiResponse } from '../BotApiTransport.ts'
import * as HttpBody from '@effect/platform/HttpBody'
import * as HttpClient from '@effect/platform/HttpClient'
import * as Effect from 'effect/Effect'
import * as Layer from 'effect/Layer'
import { BotApiTransport, BotApiTransportError } from '../BotApiTransport.ts'

export const layerWith = (options: {
  makeUrl: (method: string) => URL
}) => Layer.effect(
  BotApiTransport,
  Effect.gen(function* () {
    const { makeUrl } = options
    const client = yield* HttpClient.HttpClient
    const transport: typeof BotApiTransport.Service = {
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
    return transport
  }),
)
