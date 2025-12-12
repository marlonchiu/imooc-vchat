<template>
  <div class="flex items-center justify-between h-screen">
    <div class="bg-gray-200 w-[300px] h-full border-r border-gray-300">
      <ConversationList :items="items" />
    </div>
    <div class="h-full flex-1">content</div>
  </div>
</template>

<script lang="ts" setup>
import { ConversationProps } from './types'
import ConversationList from './components/ConversationList.vue'

const items: ConversationProps[] = [
  {
    id: 1,
    selectedModel: 'GPT-3.5-Turbo',
    title: '什么是光合作用1',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03',
    providerId: 1
  },
  {
    id: 2,
    selectedModel: 'GPT-3.5-Turbo',
    title: '什么是光合作用',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03',
    providerId: 1
  },
  {
    id: 3,
    selectedModel: 'GPT-3.5-Turbo',
    title: '什么是光合作用',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03',
    providerId: 1
  },
  {
    id: 4,
    selectedModel: 'GPT-3.5-Turbo',
    title: '什么是光合作用, 你的说法很请正确，理解的很不错',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03',
    providerId: 1
  }
]
</script>
