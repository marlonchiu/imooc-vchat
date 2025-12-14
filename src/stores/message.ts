import { defineStore } from 'pinia'
import { MessageProps, UpdatedStreamData, MessageStatus } from '../types'
import { db } from '../db'

export interface MessageStore {
  items: MessageProps[]
}

export const useMessageStore = defineStore('message', {
  state: (): MessageStore => {
    return {
      items: []
    }
  },
  actions: {
    async fetchMessagesByConversation(conversationId: number) {
      const items = await db.messages.where({ conversationId }).toArray()
      this.items = items
    },
    async createMessage(createdData: Omit<MessageProps, 'id'>) {
      const newMessageId = await db.messages.add(createdData)
      this.items.push({ id: newMessageId, ...createdData })
      return newMessageId
    },
    async updateMessage(streamData: UpdatedStreamData) {
      const { messageId, data } = streamData
      const currentMessage = this.items.find((item) => item.id === messageId)
      if (currentMessage) {
        const updatedData = {
          status: data.is_end ? 'finished' : ('streaming' as MessageStatus),
          updatedAt: new Date().toISOString(),
          ...(!data.is_end && { content: currentMessage.content + data.result })
        }

        await db.messages.update(messageId, updatedData)
        const index = this.items.findIndex((item) => item.id === messageId)
        if (index !== -1) {
          this.items[index] = { ...this.items[index], ...updatedData }
        }
      }
    }
  },
  getters: {
    // 最后一个提问
    getLastQuestion: (state) => (conversationId: number) => {
      return state.items.findLast((item) => item.conversationId === conversationId && item.type === 'question')
    }
  }
})
