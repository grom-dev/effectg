import type * as Types from './types.gen'
import * as Data from 'effect/Data'

/**
 * Error returned from the Bot API server in case of an unsuccessful request.
 */
export class BotApiError extends Data.TaggedError('BotApiError') {
  public override readonly message: string
  public readonly errorCode: number
  public readonly description: string
  public readonly parameters?: Types.ResponseParameters

  constructor(
    errorCode: number,
    description: string,
    parameters?: Types.ResponseParameters,
  ) {
    super()
    this.errorCode = errorCode
    this.description = description
    this.parameters = parameters
    this.message = `${description} (${errorCode})`
  }
}
