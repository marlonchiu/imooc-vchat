<template>
  <div class="flex items-center justify-between h-screen">
    <div class="bg-gray-200 w-[300px] h-full border-r border-gray-300">
      <div class="h-[90%] overflow-y-auto">
        <ConversationList :items="items" />
      </div>
      <div class="h-[10%] grid grid-cols-2 gap-2 p-2">
        <RouterLink to="/">
          <button
            class="shadow-sm inline-flex items-center justify-center bg-green-700 text-white hover:bg-green-700/90 border border-green-700 h-[32px] py-[8px] px-[15px] text-sm rounded-[4px]"
          >
            <Icon icon="radix-icons:chat-bubble" class="mr-2"></Icon>
            新建聊天
          </button>
        </RouterLink>
        <RouterLink to="/settings">
          <button
            class="shadow-sm inline-flex items-center justify-center bg-green-50 text-green-700 hover:bg-green-700 border border-green-700 hover:text-white h-[32px] py-[8px] px-[15px] text-sm rounded-[4px]"
          >
            <Icon icon="radix-icons:gear" class="mr-2"></Icon>
            应用设置
          </button>
        </RouterLink>
      </div>
    </div>
    <div class="h-full flex-1">
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { ConversationProps } from './types'
import ConversationList from './components/ConversationList.vue'

// 历史对话列表
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
