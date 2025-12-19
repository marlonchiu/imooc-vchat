import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { i18n } from './i18n'

import './index.css'
import 'highlight.js/styles/github-dark.min.css'

const pinia = createPinia()

const app = createApp(App)

// 初始化 i18n
app.use(pinia).use(router).use(i18n).mount('#app')
