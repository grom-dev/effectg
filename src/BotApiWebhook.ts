/**
 * This module implements Telegram Bot API webhook requests verification.
 *
 * @see https://core.telegram.org/bots/api#setwebhook
 */

import type * as BotApi from './BotApi.ts'
import { Buffer } from 'node:buffer'
import * as crypto from 'node:crypto'
import * as HttpApiMiddleware from '@effect/platform/HttpApiMiddleware'
import * as HttpApiSchema from '@effect/platform/HttpApiSchema'
import * as HttpServerRequest from '@effect/platform/HttpServerRequest'
import * as Context from 'effect/Context'
import * as Effect from 'effect/Effect'
import * as Layer from 'effect/Layer'
import * as Match from 'effect/Match'
import * as Redacted from 'effect/Redacted'
import * as Schema from 'effect/Schema'

export const SECRET_HEADER = 'x-telegram-bot-api-secret-token'

// eslint-disable-next-line unicorn/throw-new-error
export class VerificationFailedError extends Schema.TaggedError<VerificationFailedError>()(
  '@grom.js/effect-tg/BotApiWebhook/VerificationFailedError',
  Schema.Struct({
    reason: Schema.Literal(
      'MISSING_HEADER',
      'INVALID_SECRET',
      'INVALID_REQUEST',
      'BROKEN_TRANSPORT',
    ),
  }),
  HttpApiSchema.annotations({
    status: 401,
    description: 'Webhook verification failed.',
  }),
) {}

export class Update extends Context.Tag('@grom.js/effect-tg/BotApiWebhook/Update')<
  Update,
  BotApi.Types.Update
>() {}

export class VerifyMiddleware extends HttpApiMiddleware.Tag<VerifyMiddleware>()(
  '@grom.js/effect-tg/BotApiWebhook/VerifyMiddleware',
  {
    optional: false,
    failure: VerificationFailedError,
    provides: Update,
  },
) {
  public static live(options: {
    /**
     * Telegram webhook secret token.
     */
    secret: Redacted.Redacted<string>
  }) {
    return Layer.succeed(
      VerifyMiddleware,
      Effect.gen(function* () {
        const req = yield* HttpServerRequest.HttpServerRequest
        const actual = req.headers[SECRET_HEADER]
        if (actual == null) {
          return yield* new VerificationFailedError({ reason: 'MISSING_HEADER' })
        }
        const equal = crypto.timingSafeEqual(
          Buffer.from(Redacted.value(options.secret)),
          Buffer.from(actual),
        )
        if (!equal) {
          return yield* new VerificationFailedError({ reason: 'INVALID_SECRET' })
        }
        const update = yield* req.json.pipe(
          Effect.catchTag('RequestError', error => (
            new VerificationFailedError({
              reason: Match.value(error.reason).pipe(
                Match.when('Decode', () => 'INVALID_REQUEST' as const),
                Match.when('Transport', () => 'BROKEN_TRANSPORT' as const),
                Match.exhaustive,
              ),
            })
          )),
        )
        return update as BotApi.Types.Update
      }),
    )
  }
}
