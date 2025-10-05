import type { InputMessageContent } from '../InputMessageContent'

export const contentSymbol = Symbol.for('effectg/contentSymbol')

export interface Contentful {
  [contentSymbol]: () => InputMessageContent
}
