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
import { onMounted, ref } from 'vue'
import { Icon } from '@iconify/vue'
import ConversationList from './components/ConversationList.vue'
import Button from './components/Button.vue'
import { db, initProviders } from './db'
import { ConversationProps } from './types'

const conversations = ref<ConversationProps[]>([])

onMounted(async () => {
  await initProviders()
  conversations.value = await db.conversations.toArray()
})
</script>
