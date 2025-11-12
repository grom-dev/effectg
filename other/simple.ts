import { FetchHttpClient } from '@effect/platform'
import { NodeRuntime } from '@effect/platform-node'
import { Config, Effect, Layer, Option, Redacted } from 'effect'
import { BotApi, BotApiTransport, Chat, Content, Send, Text } from '../src/index.ts'

const main = Effect.gen(function* () {
  const msg = yield* Send.message({
    chat: new Chat.PeerUser({ id: 856856273 }),
    content: new Content.Text({
      text: new Text.Html({ html: 'Hi <i>there</i>! Subscribe to <a href="t.me/evermake_ch">my channel</a>' }),
      linkPreview: Option.none(),
    }),
    options: new Send.Options({ protectContent: true }),
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

NodeRuntime.runMain(live)
