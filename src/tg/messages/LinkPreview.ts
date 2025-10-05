import type { Types } from '../../bot-api'

export class LinkPreview {
  public disabled: boolean = true
  public url: string | null = null
  public loc: 'above' | 'below' = 'below'
  public mediaSize: 'lg' | 'sm' = 'sm'

  constructor() {}

  get options(): Types.LinkPreviewOptions {
    if (this.disabled) {
      return { is_disabled: true }
    }
    const opts: Types.LinkPreviewOptions = {}
    if (this.url) {
      opts.url = this.url
    }
    if (this.loc === 'above') {
      opts.show_above_text = true
    }
    switch (this.mediaSize) {
      case 'lg':
        opts.prefer_large_media = true
        break
      case 'sm':
        opts.prefer_small_media = true
        break
    }
    return opts
  }
}
