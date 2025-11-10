import { FetchHttpClient } from '@effect/platform'
import { BunRuntime } from '@effect/platform-bun'
import { Config, Effect, Layer, Redacted } from 'effect'
import { BotApi, BotApiTransport, Tg } from '../src'

const main = Effect.gen(function* () {
  const msg = yield* Tg.sendMessage({
    chat: new Tg.PeerUser({ id: 856856273 }),
    content: new Tg.TextMessage({
      text: new Tg.TextHtml({ html: 'Hi <i>there</i>! Subscribe to <a href="t.me/evermake_ch">my channel</a>' }),
    }),
    options: new Tg.SendOptions({ contentProtection: true }),
  })
  yield* Effect.log(`Sent message: ${msg.message_id}`)
})

const BotApiLive = Layer.effect(BotApi.BotApi, Effect.gen(function* () {
  const token = yield* Config.redacted('BOT_API_TOKEN')
  const transport = yield* BotApiTransport.makeProd(Redacted.value(token))
  const api = yield* BotApi.make({ transport })
  return api
}))

const live = main.pipe(
  Effect.provide(BotApiLive),
  Effect.provide(FetchHttpClient.layer),
)

BunRuntime.runMain(live)
