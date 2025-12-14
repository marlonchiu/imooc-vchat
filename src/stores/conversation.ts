import { defineStore } from 'pinia'
import { ConversationProps } from '../types'

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
  }
})
