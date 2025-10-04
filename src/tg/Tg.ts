import * as Context from 'effect/Context'

export class Tg extends Context.Tag('@grom.js/effectg:Tg')<
  Tg,
  TgShape
>() {}

export interface TgShape {
  send: 'todo'
  reply: 'todo'
}
