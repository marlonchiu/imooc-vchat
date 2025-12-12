<!-- 对话列表 -->
<template>
  <div class="conversation-list">
    <div
      class="item border-gray-300 border-t cursor-pointer hover:bg-green-50 p-2"
      v-for="item in items"
      :key="item.id"
    >
      <RouterLink :to="`/conversation/${item.id}`">
        <div class="flex justify-between items-center text-sm leading-5 text-gray-500">
          <span>{{ item.selectedModel }}</span>
          <span>{{ item.updatedAt }}</span>
        </div>
        <h2 class="flex-1 font-semibold leading-6 text-gray-900 truncate">{{ item.title }}</h2>
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'ConversationList' })

import { useRouter } from 'vue-router'
import { ConversationProps } from '../types'
defineProps<{ items: ConversationProps[] }>()

const router = useRouter()
const goToConversation = (id: number) => {
  router.push({ path: `/conversation/${id}`, query: { name: 'zq' }, hash: '#foo' })
}
</script>

<style lang="scss" scoped></style>
