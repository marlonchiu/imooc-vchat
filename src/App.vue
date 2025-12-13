<template>
  <div class="flex items-center justify-between h-screen">
    <div class="bg-gray-200 w-[300px] h-full border-r border-gray-300">
      <div class="h-[90%] overflow-y-auto">
        <ConversationList :items="conversations" />
      </div>

      <div class="h-[10%] grid grid-cols-2 gap-2 p-2">
        <RouterLink to="/">
          <Button>
            <Icon icon="radix-icons:chat-bubble" class="mr-2"></Icon>
            新建聊天
          </Button>
        </RouterLink>
        <RouterLink to="/settings">
          <Button plain>
            <Icon icon="radix-icons:gear" class="mr-2"></Icon>
            应用设置
          </Button>
        </RouterLink>
      </div>
    </div>
    <div class="h-full flex-1">
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { conversations, providers } from './testData'
import ConversationList from './components/ConversationList.vue'
import Button from './components/Button.vue'
import { db } from './db'

onMounted(async () => {
  // 添加
  const insertedId = await db.providers.add(providers[0])
  console.log('insertedId', insertedId)

  // 查询
  // const items = await db.providers.where({ id: 1 }).toArray()
  // console.log('items', items)

  // 更新
  // const updatedItem = await db.providers.update(1, { desc: 'updated desc' })
  // console.log('updatedItem', updatedItem)

  // 删除
  // const deletedItem = await db.providers.delete(1)
  // console.log('deletedItem', deletedItem)
})
</script>
