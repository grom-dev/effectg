import { FetchHttpClient } from '@effect/platform'
import { BunRuntime } from '@effect/platform-bun'
import { Config, Console, Effect, Layer, Redacted } from 'effect'
import { fetchNews } from 'somewhere'
import { BotApi, BotApiTransport, Tg } from '../src'

const main = Effect.gen(function* () {
  const channelId = yield* Config.number('CHANNEL_ID')
  const news = yield* fetchNews
  const sent = yield* Tg.sendMessage({
    chat: new Tg.PeerChannel({ id: channelId }),
    content: news.content,
  })
  yield* Console.log('Sent message ID:', sent.message_id)
})

const BotApiLive = Layer.effect(
  BotApi.BotApi,
  Effect.gen(function* () {
    const token = yield* Config.redacted('BOT_API_TOKEN')
    const transport = yield* BotApiTransport.makeProd(Redacted.value(token))
    const api = yield* BotApi.make({ transport })
    return api
  }),
)

const runnable = main.pipe(
  Effect.provide(BotApiLive),
  Effect.provide(FetchHttpClient.layer),
)

BunRuntime.runMain(runnable)
