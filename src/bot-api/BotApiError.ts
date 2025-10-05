import type * as Types from './types.gen'
import * as Data from 'effect/Data'

/**
 * Error returned from the Bot API server in case of an unsuccessful request.
 */
export class BotApiError extends Data.TaggedError('BotApiError')<{
  code: number
  description: string
  parameters?: Types.ResponseParameters
}> {}
