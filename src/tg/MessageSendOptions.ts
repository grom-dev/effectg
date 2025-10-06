import type { MethodParams } from '../bot-api'
import * as Data from 'effect/Data'

export class MessageSendOptions extends Data.Class<{
  silently?: boolean
  contentProtection?: boolean
  paidBroadcast?: boolean
}> {
  get sendParams(): Pick<MethodParams['sendMessage'], 'disable_notification' | 'protect_content' | 'allow_paid_broadcast'> {
    return {
      disable_notification: this.silently || undefined,
      protect_content: this.contentProtection || undefined,
      allow_paid_broadcast: this.paidBroadcast || undefined,
    }
  }
}
