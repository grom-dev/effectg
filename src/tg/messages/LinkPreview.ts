import type { Types } from '../../bot-api'
import * as Data from 'effect/Data'

export class LinkPreview extends Data.Class<{
  url?: string | null
  pos?: 'above' | 'below'
  media?: 'large' | 'small'
}> {
  get options(): Types.LinkPreviewOptions {
    const opts: Types.LinkPreviewOptions = {}
    if (this.url) {
      opts.url = this.url
    }
    if (this.pos === 'above') {
      opts.show_above_text = true
    }
    if (this.media === 'large') {
      opts.prefer_large_media = true
    }
    else if (this.media === 'small') {
      opts.prefer_small_media = true
    }
    return opts
  }
}
