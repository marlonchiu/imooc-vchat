<template>
  <div class="w-[80%] mx-auto h-full">
    <div class="flex items-center h-[85%]">
      <ProviderSelect :items="providers" v-model="currentProvider" />
    </div>
    <div class="flex items-center h-[15%]">
      <MessageInput @create="createConversation" :disabled="currentProvider === ''" />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'Home' })

import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import ProviderSelect from '../components/ProviderSelect.vue'
import MessageInput from '../components/MessageInput.vue'
import { db } from '../db'

import { useConversationStore } from '../stores/conversation'
const conversationStore = useConversationStore()
import { useProviderStore } from '../stores/provider'
const providerStore = useProviderStore()

const router = useRouter()
const currentProvider = ref('')
const providers = computed(() => providerStore.items)

const modelInfo = computed(() => {
  const [providerId, selectedModel] = currentProvider.value.split('/')
  return {
    providerId: parseInt(providerId),
    selectedModel
  }
})

const createConversation = async (question: string) => {
  const { providerId, selectedModel } = modelInfo.value

  const currentDate = new Date().toISOString()

  const conversationId = await conversationStore.createConversation({
    title: question,
    selectedModel,
    providerId,
    createdAt: currentDate,
    updatedAt: currentDate
  })

  const newMessageId = await db.messages.add({
    content: question,
    conversationId,
    type: 'question',
    createdAt: currentDate,
    updatedAt: currentDate
  })
  conversationStore.selectedId = conversationId
  router.push(`/conversation/${conversationId}?init=${newMessageId}`)
}
</script>
