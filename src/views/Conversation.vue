<template>
  <div v-if="conversation" class="h-[10%] bg-gray-200 border-b border-gray-300 flex items-center px-3 justify-between">
    <h3 class="font-semibold text-gray-900">{{ conversation.title }}</h3>
    <span class="text-sm text-gray-500">{{ dayjs(conversation.updatedAt).format('YYYY-MM-DD HH:mm:ss') }}</span>
  </div>
  <div class="w-[80%] mx-auto h-[75%] overflow-y-auto pt-2">
    <MessageList :messages="filteredMessages" ref="messageListRef" />
  </div>
  <div class="w-[80%] mx-auto h-[15%] flex items-center">
    <MessageInput v-model="inputValue" @create="sendNewMessage" :disabled="isMessageLoading" />
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'Conversation' })

import { ref, watch, onMounted, computed, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import MessageInput from '../components/MessageInput.vue'
import MessageList from '../components/MessageList.vue'
import { MessageProps, MessageListInstance, MessageStatus } from '../types'
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

const messageListRef = ref<MessageListInstance>()

const sendedMessages = computed(() =>
  filteredMessages.value
    .filter((message) => message.status !== 'loading' && message.status !== 'error')
    .map((message) => {
      return {
        role: message.type === 'question' ? 'user' : 'assistant',
        content: message.content,
        ...(message.imagePath && { imagePath: message.imagePath })
      }
    })
)

onMounted(async () => {
  await messageStore.fetchMessagesByConversation(conversationId.value)
  await messageScrollToBottom()
  if (initMessageId) {
    await creatingInitialMessage()
  }

  // 优化滚动 只有内容高度变化了时 才滚动
  let currentMessageListHeight = 0
  let streamContent = ''
  const checkAndScrollToBottom = async () => {
    if (messageListRef.value) {
      const newHeight = messageListRef.value.ref.clientHeight
      if (newHeight > currentMessageListHeight) {
        currentMessageListHeight = newHeight
        await messageScrollToBottom()
      }
    }
  }

  window.electronAPI.onUpdateMessage(async (streamData) => {
    console.log('onUpdateMessage', streamData)
    const { messageId, data } = streamData
    streamContent += data.result

    const getMessageStatus = (data: any): MessageStatus => {
      if (data.is_error) {
        return 'error'
      } else if (data.is_end) {
        return 'finished'
      } else {
        return 'streaming'
      }
    }
    const updatedData = {
      content: streamContent,
      status: getMessageStatus(data),
      updatedAt: new Date().toISOString()
    }

    await messageStore.updateMessage(messageId, updatedData)
    await nextTick()
    await checkAndScrollToBottom()
    if (data.is_end) {
      streamContent = ''
    }
  })
})

watch(
  () => route.params.id,
  async (newId: string) => {
    conversationId.value = parseInt(newId)
    await messageStore.fetchMessagesByConversation(conversationId.value)
    await messageScrollToBottom()
  }
)

// 发送提问
const sendNewMessage = async (question: string, imagePath?: string) => {
  if (question) {
    let copiedImagePath: string | undefined
    if (imagePath) {
      try {
        copiedImagePath = await window.electronAPI.copyImageToUserDir(imagePath)
        console.log('copiedImagePath', copiedImagePath)
      } catch (error) {
        console.error('Failed to copy image:', error)
      }
    }
    const currentDate = new Date().toISOString()
    const createdData: Omit<MessageProps, 'id'> = {
      content: question,
      conversationId: conversationId.value,
      createdAt: currentDate,
      updatedAt: currentDate,
      type: 'question',
      ...(copiedImagePath && { imagePath: copiedImagePath })
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
  await messageScrollToBottom()

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

// 自动滚动到信息的最下方
const messageScrollToBottom = async () => {
  await nextTick()
  if (messageListRef.value) {
    messageListRef.value.ref.scrollIntoView({ block: 'end', behavior: 'smooth' })
  }
}
</script>
