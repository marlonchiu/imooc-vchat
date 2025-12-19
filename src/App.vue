<template>
  <div class="flex items-center justify-between h-screen">
    <div class="bg-gray-200 w-[300px] h-full border-r border-gray-300">
      <div class="h-[90%] overflow-y-auto">
        <ConversationList :items="items" />
      </div>

      <div class="h-[10%] grid grid-cols-2 gap-2 p-2">
        <RouterLink to="/">
          <Button icon-name="radix-icons:chat-bubble" class="w-full">{{ t('common.newChat') }}</Button>
        </RouterLink>
        <RouterLink to="/settings">
          <Button icon-name="radix-icons:gear" plain class="w-full">{{ t('common.appSettings') }}</Button>
        </RouterLink>
      </div>
    </div>
    <div class="h-full flex-1">
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue'
import ConversationList from './components/ConversationList.vue'
import Button from './components/Button.vue'
import { initProviders } from './db'
import { useConversationStore } from './stores/conversation'
import { useProviderStore } from './stores/provider'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const conversationStore = useConversationStore()
const items = computed(() => conversationStore.items)

const providerStore = useProviderStore()

onMounted(async () => {
  await initProviders()
  // 获取初始化需要的数据
  providerStore.fetchProviders()
  conversationStore.fetchConversations()
})
</script>
