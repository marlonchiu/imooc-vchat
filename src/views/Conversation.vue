<template>
  <div v-if="conversation" class="h-[10%] bg-gray-200 border-b border-gray-300 flex items-center px-3 justify-between">
    <h3 class="font-semibold text-gray-900">{{ conversation.title }}</h3>
    <span class="text-sm text-gray-500">{{ dayjs(conversation.updatedAt).format('YYYY-MM-DD') }}</span>
  </div>
  <div class="w-[80%] mx-auto h-[75%] overflow-y-auto pt-2">
    <MessageList :messages="filteredMessages" />
  </div>
  <div class="w-[80%] mx-auto h-[15%] flex items-center">
    <MessageInput />
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'Conversation' })
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import MessageInput from '../components/MessageInput.vue'
import MessageList from '../components/MessageList.vue'
import { MessageProps, ConversationProps } from '../types'
import { db } from '../db'
import dayjs from 'dayjs'

const route = useRoute()

const filteredMessages = ref<MessageProps[]>([])
const conversation = ref<ConversationProps>()

let conversationId = parseInt(route.params.id as string)
const initMessageId = parseInt(route.query.init as string)
console.log('🚀 ~ initMessageId:', initMessageId)

const creatingInitialMessage = async () => {
  const currentDate = new Date().toISOString()
  const createdData: Omit<MessageProps, 'id'> = {
    content: '',
    conversationId,
    type: 'answer',
    createdAt: currentDate,
    updatedAt: currentDate,
    status: 'loading'
  }
  const newMessageId = await db.messages.add(createdData)
  filteredMessages.value.push({ id: newMessageId, ...createdData })
}

onMounted(async () => {
  conversation.value = await db.conversations.where({ id: conversationId }).first()
  filteredMessages.value = await db.messages.where({ conversationId }).toArray()
  if (initMessageId) {
    await creatingInitialMessage()
  }
})

watch(
  () => route.params.id,
  async (newId: string) => {
    conversationId = parseInt(newId)
    conversation.value = await db.conversations.where({ id: conversationId }).first()
    filteredMessages.value = await db.messages.where({ conversationId }).toArray()
  }
)
</script>
