import { Dexie, type EntityTable } from 'dexie'
import { ProviderProps, ConversationProps, MessageProps } from './types'
import { providers } from './testData'

// 创建了包含 3 个表的数据库实例，EntityTable<T, K> 为每张表绑定 TypeScript 类型
export const db = new Dexie('vChatDatabase') as Dexie & {
  providers: EntityTable<ProviderProps, 'id'>
  conversations: EntityTable<ConversationProps, 'id'>
  messages: EntityTable<MessageProps, 'id'>
}

db.version(1).stores({
  providers: '++id, name', // 自增ID + 名称索引
  conversations: '++id, providerId', // 主键id，索引providerId, 关联provider
  messages: '++id, conversationId' // 主键id，索引conversationId, 关联conversation
})

export const initProviders = async () => {
  const count = await db.providers.count()
  if (count === 0) {
    db.providers.bulkAdd(providers)
  }
}
