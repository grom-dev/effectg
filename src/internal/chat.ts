import type { MethodParams } from './botApiMethods.gen.js'
import * as Data from 'effect/Data'

export type Chat
  = | PeerUser
    | PeerGroup
    | PeerChannel
    | PeerSupergroup
    | PublicChannel
    | PublicSupergroup
    | ForumTopic
    | ChannelDm

export class PeerUser extends makePeer({
  validatePeerId: id => (id >= 1 && id <= 0xFFFFFFFFFF),
  peerIdToDialogId: id => id,
}) {}

export class PeerGroup extends makePeer({
  validatePeerId: id => (id >= 1 && id <= 999999999999),
  peerIdToDialogId: id => -id,
}) {}

export class PeerChannel extends makePeer({
  validatePeerId: id => (id >= 1 && id <= 997852516352),
  peerIdToDialogId: id => -(1000000000000 + id),
}) {}

export class PeerSupergroup extends makePeer({
  validatePeerId: id => (id >= 1 && id <= 997852516352),
  peerIdToDialogId: id => -(1000000000000 + id),
}) {}

export class PublicChannel extends Data.Class<{ username: string }> {
  get sendParams(): SendParams {
    return { chat_id: this.username }
  }
}

export class PublicSupergroup extends Data.Class<{ username: string }> {
  get sendParams(): SendParams {
    return { chat_id: this.username }
  }
}

export class ForumTopic extends Data.Class<{
  forum: PeerSupergroup | PublicSupergroup
  topicId: number
}> {
  get sendParams(): SendParams {
    return {
      ...this.forum.sendParams,
      message_thread_id: this.topicId,
    }
  }
}

export class ChannelDm extends Data.Class<{
  channel: PeerChannel | PublicChannel
  userId: number
}> {
  get sendParams(): SendParams {
    return {
      ...this.channel.sendParams,
      direct_messages_topic_id: this.userId,
    }
  }
}

function makePeer({
  validatePeerId,
  peerIdToDialogId,
}: {
  validatePeerId: (peerId: number) => boolean
  peerIdToDialogId: (peerId: number) => number
}): new (options: { id: number }) => {
  readonly id: number
  readonly dialogId: number
  get sendParams(): SendParams
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

    public get sendParams(): SendParams {
      return { chat_id: this.dialogId }
    }
  }
  return PeerImpl
}

type SendParams = Pick<MethodParams['sendMessage'], 'chat_id' | 'message_thread_id' | 'direct_messages_topic_id'>
