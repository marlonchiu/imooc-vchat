import { Dexie, type EntityTable } from 'dexie'
import { ProviderProps } from './types'

export const db = new Dexie('vChatDatabase') as Dexie & {
  providers: EntityTable<ProviderProps, 'id'>
}

db.version(1).stores({
  providers: '++id, name'
})
