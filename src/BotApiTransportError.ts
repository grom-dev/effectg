import * as Data from 'effect/Data'

/**
 * Error caused by the transport when accessing Bot API.
 */
export class BotApiTransportError extends Data.TaggedError('@grom.js/effectg/BotApiTransportError')<{
  cause: unknown
}> {}
