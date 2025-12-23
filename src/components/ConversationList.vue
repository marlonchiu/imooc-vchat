<!-- 对话列表 -->
<template>
  <div class="conversation-list">
    <div
      class="item border-gray-300 border-t cursor-pointer p-2"
      :class="{
        'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600': conversationStore.selectedId === item.id,
        'bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700': conversationStore.selectedId !== item.id
      }"
      v-for="item in items"
      :key="item.id"
      @contextmenu.prevent="showContextMenu(item.id)"
    >
      <a @click.prevent="goToConversation(item.id)">
        <div class="flex justify-between items-center text-sm leading-5" style="color: var(--text-secondary-color, #6b7280)">
          <span>{{ item.selectedModel }}</span>
          <span>{{ dayjs(item.updatedAt).format('YYYY-MM-DD') }}</span>
        </div>
        <h2 class="flex-1 font-semibold leading-6 truncate" style="color: var(--text-color, #111827)">{{ item.title }}</h2>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'ConversationList' })

defineProps<{ items: ConversationProps[] }>()

import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ConversationProps } from '../types'
import dayjs from 'dayjs'

import { useConversationStore } from '../stores/conversation'
const conversationStore = useConversationStore()

const router = useRouter()
const goToConversation = (id: number) => {
  router.push({ path: `/conversation/${id}` })
  conversationStore.selectedId = id
}

const showContextMenu = (id: number) => {
  window.electronAPI.showContextMenu(id)
}
onMounted(() => {
  window.electronAPI.onDeleteConversation(async (id: number) => {
    await conversationStore.deleteConversation(id)
    if (conversationStore.selectedId === id) {
      conversationStore.selectedId = -1
      router.push('/')
    }
  })
})
</script>

<style lang="scss" scoped></style>
