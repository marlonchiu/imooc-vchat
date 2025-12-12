import { createApp } from 'vue'
import App from './App.vue'

import { createRouter, createMemoryHistory, createWebHashHistory } from 'vue-router'
import Home from './views/Home.vue'
import Conversation from './views/Conversation.vue'
import Settings from './views/Settings.vue'
import './index.css'

const routes = [
  { path: '/', component: Home },
  { path: '/conversation/:id', component: Conversation },
  { path: '/settings', component: Settings }
]
const router = createRouter({
  // history: createMemoryHistory(),
  history: createWebHashHistory(),
  routes
})
const app = createApp(App)
app.use(router).mount('#app')
