import type { MethodParams } from './BotApi.ts'
import type { Chat } from './Chat.ts'
import type { Content } from './Content.ts'
import * as Data from 'effect/Data'
import * as Effect from 'effect/Effect'
import * as Match from 'effect/Match'
import * as BotApi from './BotApi.ts'

/**
 * Creates an effect that sends a message.
 *
 * @todo Reply options are not supported.
 * @todo Reply markup is not supported.
 */
export const message = (args: {
  chat: Chat
  content: Content
  options?: Options
}) => {
  const rest = {
    ...args.chat.sendParams(),
    ...args.options?.sendParams(),
  }
  return BotApi.BotApi.pipe(
    Effect.andThen(api =>
      Match.value(args.content).pipe(
        Match.tag('text', content => api.sendMessage({ ...rest, ...content.sendParams() })),
        Match.tag('photo', content => api.sendPhoto({ ...rest, ...content.sendParams() })),
        Match.exhaustive,
      ),
    ),
  )
}

export class Options extends Data.Class<{
  disableNotification?: boolean
  protectContent?: boolean
  allowPaidBroadcast?: boolean
}> {
  sendParams(): Pick<MethodParams['sendMessage'], 'disable_notification' | 'protect_content' | 'allow_paid_broadcast'> {
    return {
      disable_notification: this.disableNotification || undefined,
      protect_content: this.protectContent || undefined,
      allow_paid_broadcast: this.allowPaidBroadcast || undefined,
    }
  }
}
