import type { Bot } from './Bot.ts'

export interface Middleware {
  <E, R>(self: Bot<E, R>): Bot<any, any>
}

export const make: <M extends Middleware>(middleware: M) => M = m => m
