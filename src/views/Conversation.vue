<template>
  <div v-if="conversation" class="h-[10%] bg-gray-200 border-b border-gray-300 flex items-center px-3 justify-between">
    <h3 class="font-semibold text-gray-900">{{ conversation.title }}</h3>
    <span class="text-sm text-gray-500">{{ dayjs(conversation.updatedAt).format('YYYY-MM-DD') }}</span>
  </div>
  <div class="w-[80%] mx-auto h-[75%] overflow-y-auto pt-2">
    <MessageList :messages="filteredMessages" />
  </div>
  <div class="w-[80%] mx-auto h-[15%] flex items-center">
    <MessageInput v-model="inputValue" @create="sendNewMessage" :disabled="isMessageLoading" />
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'Conversation' })

import { ref, watch, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import MessageInput from '../components/MessageInput.vue'
import MessageList from '../components/MessageList.vue'
import { MessageProps } from '../types'
import { db } from '../db'
import dayjs from 'dayjs'
import { useConversationStore } from '../stores/conversation'
const conversationStore = useConversationStore()
import { useMessageStore } from '../stores/message'
const messageStore = useMessageStore()
import { useProviderStore } from '../stores/provider'
const providerStore = useProviderStore()

const route = useRoute()
const inputValue = ref('')
let conversationId = ref(parseInt(route.params.id as string))
const conversation = computed(() => conversationStore.getConversationById(conversationId.value))

const initMessageId = parseInt(route.query.init as string)
const filteredMessages = computed(() => messageStore.items)
const isMessageLoading = computed(() => messageStore.isMessageLoading)

const sendedMessages = computed(() =>
  filteredMessages.value
    .filter((message) => message.status !== 'loading')
    .map((message) => {
      return {
        role: message.type === 'question' ? 'user' : 'assistant',
        content: message.content
      }
    })
)

onMounted(async () => {
  await messageStore.fetchMessagesByConversation(conversationId.value)

  if (initMessageId) {
    await creatingInitialMessage()
  }

  window.electronAPI.onUpdateMessage(async (streamData) => {
    console.log('onUpdateMessage', streamData)
    messageStore.updateMessage(streamData)
  })
})

watch(
  () => route.params.id,
  async (newId: string) => {
    conversationId.value = parseInt(newId)
    await messageStore.fetchMessagesByConversation(conversationId.value)
  }
)

// 发送提问
const sendNewMessage = async (question: string) => {
  if (question) {
    const currentDate = new Date().toISOString()
    const createdData: Omit<MessageProps, 'id'> = {
      content: question,
      conversationId: conversationId.value,
      createdAt: currentDate,
      updatedAt: currentDate,
      type: 'question'
    }

    await messageStore.createMessage(createdData)

    inputValue.value = ''
    creatingInitialMessage()
  }
}

const creatingInitialMessage = async () => {
  const currentDate = new Date().toISOString()
  const createdData: Omit<MessageProps, 'id'> = {
    content: '',
    conversationId: conversationId.value,
    type: 'answer',
    createdAt: currentDate,
    updatedAt: currentDate,
    status: 'loading'
  }
  const newMessageId = await messageStore.createMessage(createdData)

  if (conversation.value) {
    const provider = providerStore.getProviderById(conversation.value.providerId)
    if (provider) {
      console.log('~~~~~provider', provider)
      await window.electronAPI.startChat({
        messageId: newMessageId,
        providerName: provider.name,
        selectedModel: conversation.value.selectedModel,
        messages: sendedMessages.value
      })
    }
  }
}
</script>
