import { defineStore } from 'pinia'
import { ConversationProps } from '../types'
import { db } from '../db'

// 定义接口 ConversationStore, items:属性, ConversationProps:类型
export interface ConversationStore {
  items: ConversationProps[]
  selectedId: number
}

// 创建 conversation store
export const useConversationStore = defineStore('conversation', {
  state: (): ConversationStore => {
    return {
      items: [],
      selectedId: -1
    }
  },
  actions: {
    async fetchConversations() {
      // 对话列表倒序显示
      const items = await db.conversations.orderBy('id').reverse().toArray()
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
    },
    // 删除对话
    async deleteConversation(id: number) {
      await db.conversations.delete(id)
      const index = this.items.findIndex((item) => item.id === id)
      if (index > -1) {
        this.items.splice(index, 1)
      }
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
