import { createRouter, createMemoryHistory } from 'vue-router'
import Home from './views/Home.vue'
import Conversation from './views/Conversation.vue'
import Settings from './views/Settings.vue'
import { useConversationStore } from './stores/conversation'

const routes = [
  { path: '/', component: Home },
  { path: '/conversation/:id', component: Conversation },
  { path: '/settings', component: Settings }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

router.beforeEach((to) => {
  const conversationStore = useConversationStore()
  if (!to.path.startsWith('/conversation/')) {
    conversationStore.selectedId = -1
  }
})

export default router
