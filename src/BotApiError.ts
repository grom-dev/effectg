import type * as Types from './internal/botApiTypes.gen'
import * as Data from 'effect/Data'

/**
 * Error returned from the Bot API server in case of unsuccessful method call.
 */
export class BotApiError extends Data.TaggedError('@grom.js/effectg/BotApiError')<{
  code: number
  description: string
  parameters?: Types.ResponseParameters
}> {
  override get message() {
    return `(${this.code}) ${this.description}`
  }
}
