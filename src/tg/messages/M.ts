import type { InputFile } from '../../InputFile'
import { PhotoMessage } from './PhotoMessage'
import { TextMessage } from './TextMessage'

export const M = {
  text: (plain: string) => new TextMessage({ text: plain }),
  photo: (photo: InputFile) => new PhotoMessage(photo),
}
