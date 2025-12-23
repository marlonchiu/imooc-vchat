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
import { onMounted, computed, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import ConversationList from './components/ConversationList.vue'
import Button from './components/Button.vue'
import { initProviders } from './db'
import { useConversationStore } from './stores/conversation'
import { useProviderStore } from './stores/provider'
import { useI18n } from 'vue-i18n'
import { initI18n } from './i18n'
const { t } = useI18n()

const router = useRouter()
const conversationStore = useConversationStore()
const items = computed(() => conversationStore.items)

const providerStore = useProviderStore()

onMounted(async () => {
  await initI18n()

  // 应用主题色
  const config = await window.electronAPI.getConfig()
  document.documentElement.setAttribute('data-theme', config.theme || 'green')

  await initProviders()
  // 获取初始化需要的数据
  providerStore.fetchProviders()
  conversationStore.fetchConversations()

  // 监听菜单事件
  // 新建对话
  window.electronAPI.onMenuNewConversation(() => {
    router.push('/')
  })

  // 打开设置
  window.electronAPI.onMenuOpenSettings(() => {
    router.push('/settings')
  })
})

onBeforeUnmount(() => {
  // 清理事件监听器（如果需要的话）
  // Electron 的 ipcRenderer.removeAllListeners 会在窗口关闭时自动清理
})
</script>
