import * as Data from 'effect/Data'
import * as internal from './internal/chat.ts'

export type Chat
  = | PeerUser
    | PeerGroup
    | PeerChannel
    | PeerSupergroup
    | PublicChannel
    | PublicSupergroup
    | ForumTopic
    | ChannelDm

export class PeerUser extends internal.Peer({
  validatePeerId: id => (id >= 1 && id <= 0xFFFFFFFFFF),
  peerIdToDialogId: id => id,
}) {}

export class PeerGroup extends internal.Peer({
  validatePeerId: id => (id >= 1 && id <= 999999999999),
  peerIdToDialogId: id => -id,
}) {}

export class PeerChannel extends internal.Peer({
  validatePeerId: id => (id >= 1 && id <= 997852516352),
  peerIdToDialogId: id => -(1000000000000 + id),
}) {}

export class PeerSupergroup extends internal.Peer({
  validatePeerId: id => (id >= 1 && id <= 997852516352),
  peerIdToDialogId: id => -(1000000000000 + id),
}) {}

export class PublicChannel extends Data.Class<{ username: string }> {
  sendParams() {
    return { chat_id: this.username }
  }
}

export class PublicSupergroup extends Data.Class<{ username: string }> {
  sendParams() {
    return { chat_id: this.username }
  }
}

export class ForumTopic extends Data.Class<{
  forum: PeerSupergroup | PublicSupergroup
  topicId: number
}> {
  sendParams() {
    return {
      ...this.forum.sendParams(),
      message_thread_id: this.topicId,
    }
  }
}

export class ChannelDm extends Data.Class<{
  channel: PeerChannel | PublicChannel
  userId: number
}> {
  sendParams() {
    return {
      ...this.channel.sendParams(),
      direct_messages_topic_id: this.userId,
    }
  }
}
