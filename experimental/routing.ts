import type { BotApi } from '.'
import { Context, Effect } from 'effect'

// https://effect.website/play/#6d041e3566aa

export interface Middleware {
  <E, R>(self: Handler<E, R>): Handler<any, any>
}

export const makeMw: <M extends Middleware>(middleware: M) => M = m => m

export type App<A = void, E = never, R = never, T = UpdateContext> = Effect.Effect<
  A,
  E,
  R | T
>

/**
 * This is like {@link https://github.com/Effect-TS/effect/blob/main/packages/platform/README.md#core-concepts Default (HttpApp)}
 */
export type Handler<E = never, R = never> = App<void, E, R, UpdateContext>

// /**
//  * This is like {@link https://github.com/Effect-TS/effect/blob/main/packages/platform/README.md#core-concepts Server}
//  */
// export interface Handler {
//   readonly handle: {
//     <E, R>(bot: Handler<E, R>): Effect.Effect<
//       void,
//       never,
//       Exclude<R, UpdateContext>
//     >
//   }
// }

export class UpdateContext extends Context.Tag('effectg/UpdateContext')<
  UpdateContext,
  BotApi.Types.Update
>() {}

export class User extends Context.Tag('effectg/User')<
  User,
  BotApi.Types.User
>() {}

export const makeHandler = (

): Handler => {
  return {
    handle: (bot) => {},
  }
}

const noop: Effect.Effect<void, never, never> = Effect.succeed(void 0)

const logUpdateAddUser = makeMw(next => Effect.gen(function* () {
  const update = yield* UpdateContext
  yield* Effect.log('Update:', update.update_id)
  yield* Effect.log('Start:', new Date())
  yield* next.pipe(Effect.provideService(User, { id: 123 } as BotApi.Types.User))
  yield* Effect.log('End:', new Date())
}))

const someMw = makeMw(
  next => Effect.gen(function* () {
    const user = yield* User
    yield* Effect.log(`User: ${user.id}`)
    yield* next
  }),
)

const some = noop.pipe(
  someMw,
  logUpdateAddUser,
)
