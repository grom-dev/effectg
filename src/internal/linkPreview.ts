import type * as Types from './botApiTypes.gen.js'
import * as Data from 'effect/Data'

export class LinkPreview extends Data.Class<{
  url?: string
  position?: 'above' | 'below'
  mediaSize?: 'large' | 'small'
}> {
  get options(): Types.LinkPreviewOptions {
    const opts: Types.LinkPreviewOptions = { is_disabled: false }
    if (this.url) {
      opts.url = this.url
    }
    if (this.position === 'above') {
      opts.show_above_text = true
    }
    if (this.mediaSize === 'large') {
      opts.prefer_large_media = true
    }
    else if (this.mediaSize === 'small') {
      opts.prefer_small_media = true
    }
    return opts
  }
}
