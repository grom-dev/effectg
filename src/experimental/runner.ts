import type { Bot } from './src_prev/Bot'
import { FetchHttpClient } from '@effect/platform'
import { BunRuntime } from '@effect/platform-bun'
import { Config, Effect, Layer, Queue, Redacted, Ref } from 'effect'
import { BotApi } from './src_prev'
import { UpdateContext } from './src_prev/Bot'

////////////////////////////////////////////////////////////////////////////////

/**
 * Works quite well, but:
 * - Need to update `offset` for `getUpdates`:
 *   - to mark consumed updates as processed;
 *   - not to handle a single update multiple times.
 */

////////////////////////////////////////////////////////////////////////////////

const consumeOne = <E, R>(
  updates: Queue.Dequeue<BotApi.Types.Update>,
  handle: Bot<E, R>,
) => Effect.gen(function* () {
  const update = yield* updates.take
  yield* Effect.provideService(handle, UpdateContext, update)
})

const provideBatch = (
  updates: Queue.Enqueue<BotApi.Types.Update>,
  batchSize: Ref.Ref<number>,
) => Effect.gen(function* () {
  const api = yield* BotApi.BotApi
  const batch = yield* api.getUpdates({
    limit: yield* batchSize,
    offset: undefined, // TODO
    timeout: 30,
  })
  yield* updates.offerAll(batch)
})

const start = <E, R>(
  bot: Bot<E, R>,
) => Effect.gen(function* () {
  const batchSize = yield* Ref.make(10)
  const updates = yield* Queue.bounded<BotApi.Types.Update>(128)
  const provider = Effect.repeat(
    provideBatch(updates, batchSize),
    Effect.forever,
  )
  const consumer = Effect.repeat(
    consumeOne(updates, bot),
    Effect.forever,
  )
  return yield* Effect.raceFirst(provider, consumer)
})

const bot = Effect.gen(function* () {
  const update = yield* UpdateContext
  yield* Effect.log(`Got update#${update.update_id}`, update)
})

const main = Effect.gen(function* () {
  const api = yield* BotApi.BotApi
  yield* api.deleteWebhook()
  yield* start(bot)
})

const BotApiLive = Layer.effect(
  BotApi.BotApi,
  Effect.gen(function* () {
    const token = yield* Config.redacted('BOT_API_TOKEN')
    return BotApi.make({ token: Redacted.value(token) })
  }),
)

const runnable = main.pipe(
  Effect.provide(BotApiLive),
  Effect.provide(FetchHttpClient.layer),
)

BunRuntime.runMain(runnable)
