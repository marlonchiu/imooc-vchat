import { defineStore } from 'pinia'
import { ConversationProps } from '../types'
import { db } from '../db'

// 定义接口 ConversationStore, items:属性, ConversationProps:类型
export interface ConversationStore {
  items: ConversationProps[]
}

// 创建 conversation store
export const useConversationStore = defineStore('conversation', {
  state: (): ConversationStore => {
    return {
      items: []
    }
  },
  actions: {
    async fetchConversations() {
      const items = await db.conversations.toArray()
      this.items = items
    },
    // 创建新对话
    async createConversation(createdData: Omit<ConversationProps, 'id'>) {
      const newCId = await db.conversations.add(createdData)
      this.items.push({
        id: newCId,
        ...createdData
      })
      return newCId
    }
  },
  getters: {
    totalNumber: (state) => state.items.length,
    // 获取特定ID的对话
    // getConversationById: (state) => (id: number) => {
    //   return state.items.find(item => item.id === id)
    // },
    getConversationById: (state) => {
      return (id: number) => state.items.find((item) => item.id === id)
    }
  }
})
