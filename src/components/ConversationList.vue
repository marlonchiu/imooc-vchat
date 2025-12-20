<!-- 对话列表 -->
<template>
  <div class="conversation-list">
    <div
      class="item border-gray-300 border-t cursor-pointer p-2"
      :class="{
        'bg-gray-200 hover:bg-gray-300': conversationStore.selectedId === item.id,
        'bg-white hover:bg-gray-200': conversationStore.selectedId !== item.id
      }"
      v-for="item in items"
      :key="item.id"
      @contextmenu.prevent="showContextMenu(item.id)"
    >
      <a @click.prevent="goToConversation(item.id)">
        <div class="flex justify-between items-center text-sm leading-5 text-gray-500">
          <span>{{ item.selectedModel }}</span>
          <span>{{ dayjs(item.updatedAt).format('YYYY-MM-DD') }}</span>
        </div>
        <h2 class="flex-1 font-semibold leading-6 text-gray-900 truncate">{{ item.title }}</h2>
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
