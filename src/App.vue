<template>
  <div class="flex items-center justify-between h-screen">
    <div class="bg-gray-200 w-[300px] h-full border-r border-gray-300">
      <div class="h-[90%] overflow-y-auto">
        <ConversationList :items="conversations" />
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
import ConversationList from './components/ConversationList.vue'
import { conversations } from './testData'
</script>
