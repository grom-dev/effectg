import type { MethodParams } from './botApiMethods.gen.js'
import * as Data from 'effect/Data'

export class SendOptions extends Data.Class<{
  silently?: boolean
  contentProtection?: boolean
  paidBroadcast?: boolean
}> {
  get sendParams(): SendParams {
    return {
      disable_notification: this.silently || undefined,
      protect_content: this.contentProtection || undefined,
      allow_paid_broadcast: this.paidBroadcast || undefined,
    }
  }
}

type SendParams = Pick<MethodParams['sendMessage'], 'disable_notification' | 'protect_content' | 'allow_paid_broadcast'>
