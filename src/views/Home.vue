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
import ProviderSelect from '../components/ProviderSelect.vue'
import MessageInput from '../components/MessageInput.vue'
import { providers } from '../testData'

// 选择的大模型
const selectedModel = ref('')
</script>
