<template>
  <div class="w-[80%] mx-auto h-[85%] overflow-y-auto pt-2">
    <MessageList :messages="filteredMessages" />
  </div>
  <div class="w-[80%] mx-auto h-[15%] flex items-center">
    <MessageInput />
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'Conversation' })

import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MessageInput from '../components/MessageInput.vue'
import MessageList from '../components/MessageList.vue'
import { MessageProps } from '../types'
const route = useRoute()
// const conversationId = parseInt(route.params.id as string)
const conversationId = computed(() => parseInt(route.params.id as string))

const messages: MessageProps[] = [
  {
    id: 1,
    content: '什么是光合作用',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03',
    type: 'question',
    conversationId: 1
  },
  {
    id: 2,
    content: '你的说法很请正确，理解的很不错,你的说法很请正确，理解的很不错',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03',
    type: 'answer',
    conversationId: 1
  },
  {
    id: 3,
    content: '请告诉我更多',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03',
    type: 'question',
    conversationId: 1
  },
  {
    id: 4,
    content: '你的说法很请正确，理解的很不错,你的说法很请正确，理解的很不错',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03',
    type: 'answer',
    conversationId: 1
  },
  {
    id: 5,
    content: '还有更多的信息吗',
    createdAt: '2024-07-03',
    type: 'question',
    updatedAt: '2024-07-03',
    conversationId: 1
  },
  {
    id: 6,
    content: '',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03',
    type: 'answer',
    status: 'loading',
    conversationId: 1
  },
  {
    id: 7,
    content: '2什么是光合作用',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03',
    type: 'question',
    conversationId: 2
  },
  {
    id: 8,
    content: '2你的说法很请正确，理解的很不错,你的说法很请正确，理解的很不错',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03',
    type: 'answer',
    conversationId: 2
  },
  {
    id: 9,
    content: '2请告诉我更多',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03',
    type: 'question',
    conversationId: 2
  },
  {
    id: 10,
    content: '2你的说法很请正确，理解的很不错,你的说法很请正确，理解的很不错',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03',
    type: 'answer',
    conversationId: 2
  },
  {
    id: 11,
    content: '3还有更多的信息吗',
    createdAt: '2024-07-03',
    type: 'question',
    updatedAt: '2024-07-03',
    conversationId: 3
  },
  {
    id: 12,
    content: '',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03',
    type: 'answer',
    status: 'loading',
    conversationId: 3
  }
]

const filteredMessages = computed(() => {
  return messages.filter((message) => message.conversationId === conversationId.value)
})
</script>
