import type { BotApi as BotApiShape } from './internal/botApi.gen'
import * as HttpBody from '@effect/platform/HttpBody'
import * as Context from 'effect/Context'
import * as internal from './internal/botApi'

export { BotApiError } from './internal/botApiError'
export type { MethodParams, MethodResults } from './internal/methods.gen'
export type * as Types from './internal/types.gen'

export class BotApi extends Context.Tag('effectg/BotApi')<BotApi, BotApiShape>() {}

export function make(options: {
  token: string
  url?: 'prod' | 'test' | ((token: string, method: string) => URL)
}): BotApiShape {
  const {
    token,
    url = 'prod',
  } = options

  let makeUrl: (method: string) => URL
  if (typeof url === 'function') {
    makeUrl = method => url(token, method)
  }
  else if (url === 'prod') {
    makeUrl = method => new URL(`https://api.telegram.org/bot${token}/${method}`)
  }
  else if (url === 'test') {
    makeUrl = method => new URL(`https://api.telegram.org/bot${token}/test/${method}`)
  }
  else {
    throw new Error('Invalid "url" option.')
  }

  const makeBody = (_method: string, params: unknown): HttpBody.HttpBody => {
    return HttpBody.unsafeJson(params)
  }

  return internal.make({ makeUrl, makeBody })
}
