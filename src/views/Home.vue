<template>
  <div class="w-[80%] mx-auto h-full">
    <div class="flex items-center h-[85%]">
      <ProviderSelect :items="providers" v-model="selectedModel" />
    </div>
    <div class="flex items-center h-[15%]">
      <MessageInput />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'Home' })

import { ref } from 'vue'
import { ProviderProps } from '../types'
import ProviderSelect from '../components/ProviderSelect.vue'
import MessageInput from '../components/MessageInput.vue'

// 选择的大模型
const selectedModel = ref('')

// 大模型选框
const providers: ProviderProps[] = [
  {
    id: 1,
    name: '文心一言',
    desc: '文心一言 百度出品的大模型',
    models: ['ERNIE-4.0-8K', 'ERNIE-3.5-8K', 'ERNIE-Speed-8K'],
    // avatar: 'https://qph.cf2.poecdn.net/main-thumb-pb-3004-50-jougqzjtwfqfyqprxbdwofvnwattmtrg.jpeg',
    avatar: 'https://img.alicdn.com/imgextra/i4/O1CN01Slt9qq1Q0CmLAG9MK_!!6000000001913-55-tps-32-32.svg',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03'
  },
  {
    id: 2,
    name: '通义千问',
    desc: '通义千问',
    // https://help.aliyun.com/zh/dashscope/developer-reference/api-details?spm=a2c4g.11186623.0.0.5bf41507xgULX5#b148acc634pfc
    models: ['qwen-turbo', 'qwen-plus', 'qwen-max'],
    // avatar: 'https://qph.cf2.poecdn.net/main-thumb-pb-3004-50-jougqzjtwfqfyqprxbdwofvnwattmtrg.jpeg',
    avatar: 'https://img.alicdn.com/imgextra/i4/O1CN01Slt9qq1Q0CmLAG9MK_!!6000000001913-55-tps-32-32.svg',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03'
  }
]
</script>
