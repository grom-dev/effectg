import type { MethodParams } from '../bot-api'
import * as Data from 'effect/Data'

export class MessageDestination extends Data.Class<{
  chat: number | string
  thread?: number
  dmTopic?: number
}> {
  get sendParams(): Pick<MethodParams['sendMessage'], 'chat_id' | 'message_thread_id' | 'direct_messages_topic_id'> {
    return {
      chat_id: this.chat,
      message_thread_id: this.thread,
      direct_messages_topic_id: this.dmTopic,
    }
  }
}
