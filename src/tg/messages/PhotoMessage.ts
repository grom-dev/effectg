import type { InputFile } from '../../InputFile'
import type { FormattedText } from '../FormattedText'
import type { InputMessagePhoto } from '../InputMessageContent'
import type { Contentful } from './Contentful'
import { messageContent } from './Contentful'

export class PhotoMessage implements Contentful {
  protected readonly photo: InputFile
  protected readonly caption: FormattedText | null

  constructor(photo: InputFile, caption: FormattedText | null = null) {
    this.photo = photo
    this.caption = caption
  }

  [messageContent](): InputMessagePhoto {
    return {
      type: 'photo',
      photo: this.photo,
      caption: this.caption ?? undefined,
      hasSpoiler: false, // todo
      showCaptionAboveMedia: false, // todo
    }
  }
}
