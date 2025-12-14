<!-- 右侧对话页面 -->
<template>
  <div class="h-[10%] bg-gray-200 border-b border-gray-300 flex items-center px-3 justify-between" v-if="conversation">
    <h3 class="font-semibold text-gray-900">{{ conversation.title }}</h3>
    <span class="text-sm text-gray-500">{{ conversation.updatedAt }}</span>
  </div>
  <div class="w-[80%] mx-auto h-[75%] overflow-y-auto pt-2">
    <MessageList :messages="filteredMessages" />
  </div>
  <div class="w-[80%] mx-auto h-[15%] flex items-center">
    <MessageInput v-model="inputValue" @create="sendNewMessage" />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import MessageInput from '../components/MessageInput.vue'
import MessageList from '../components/MessageList.vue'
import { useConversationStore } from '../stores/conversation'
import { useMessageStore } from '../stores/message'
import { MessageProps } from '../types'
import { db } from '../db'

const route = useRoute()
const conversationStore = useConversationStore()
const messageStore = useMessageStore()
let conversationId = ref(parseInt(route.params.id as string))
const initMessageId = parseInt(route.query.init as string)
const inputValue = ref('')

const conversation = computed(() => conversationStore.getConversationById(conversationId.value))
const filteredMessages = computed(() => messageStore.items)
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
    console.log('==onUpdateMessage', streamData)
    // update database
    // update filteredMessages
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
    const date = new Date().toISOString()
    await messageStore.createMessage({
      content: question,
      conversationId: conversationId.value,
      createdAt: date,
      updatedAt: date,
      type: 'question'
    })
    inputValue.value = ''
    creatingInitialMessage()
  }
}

const creatingInitialMessage = async () => {
  const createdData: Omit<MessageProps, 'id'> = {
    content: '',
    conversationId: conversationId.value,
    type: 'answer',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'loading'
  }
  const newMessageId = await messageStore.createMessage(createdData)
  if (conversation.value) {
    const provider = await db.providers.where({ id: conversation.value.providerId }).first()
    if (provider) {
      console.log('==provider==', provider)
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
