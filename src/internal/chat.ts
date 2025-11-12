import type { MethodParams } from './botApiMethods.gen.ts'

type SendParams = Pick<MethodParams['sendMessage'], 'chat_id' | 'message_thread_id' | 'direct_messages_topic_id'>

export function Peer({
  validatePeerId,
  peerIdToDialogId,
}: {
  validatePeerId: (peerId: number) => boolean
  peerIdToDialogId: (peerId: number) => number
}): new (options: { id: number }) => {
  readonly id: number
  readonly dialogId: number
  sendParams: () => SendParams
} {
  class PeerImpl {
    public readonly id: number
    public readonly dialogId: number

    constructor({ id }: { id: number }) {
      if (!Number.isSafeInteger(id)) {
        throw new TypeError(`invalid integer: ${id}`)
      }
      if (!validatePeerId(id)) {
        throw new Error(`invalid peer id: ${id}`)
      }
      this.id = id
      this.dialogId = peerIdToDialogId(id)
    }

    public sendParams(): SendParams {
      return { chat_id: this.dialogId }
    }
  }
  return PeerImpl
}
