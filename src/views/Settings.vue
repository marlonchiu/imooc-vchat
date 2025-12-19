<template>
  <div class="w-[80%] mx-auto p-8">
    <h1 class="text-2xl font-bold mb-8">应用设置</h1>

    <div class="space-y-6">
      <!-- Language Setting -->
      <div class="setting-item">
        <label class="block text-sm font-medium text-gray-700 mb-2"> 语言设置 </label>
        <SelectRoot v-model="currentConfig.language" class="w-[200px]">
          <SelectTrigger
            class="inline-flex items-center justify-between rounded-md px-3 py-2 text-sm gap-1 bg-white border border-gray-300"
          >
            <SelectValue placeholder="选择语言..." />
            <SelectIcon>
              <Icon icon="radix-icons:chevron-down" />
            </SelectIcon>
          </SelectTrigger>
          <SelectPortal>
            <SelectContent class="bg-white rounded-md shadow-lg border">
              <SelectViewport class="p-2">
                <SelectGroup>
                  <SelectItem
                    value="zh"
                    class="relative flex items-center px-8 py-2 text-sm text-gray-700 rounded-md cursor-default hover:bg-gray-100"
                  >
                    <SelectItemText>中文</SelectItemText>
                    <SelectItemIndicator class="absolute left-2 inline-flex items-center">
                      <Icon icon="radix-icons:check" />
                    </SelectItemIndicator>
                  </SelectItem>
                  <SelectItem
                    value="en"
                    class="relative flex items-center px-8 py-2 text-sm text-gray-700 rounded-md cursor-default hover:bg-gray-100"
                  >
                    <SelectItemText>English</SelectItemText>
                    <SelectItemIndicator class="absolute left-2 inline-flex items-center">
                      <Icon icon="radix-icons:check" />
                    </SelectItemIndicator>
                  </SelectItem>
                </SelectGroup>
              </SelectViewport>
            </SelectContent>
          </SelectPortal>
        </SelectRoot>
      </div>

      <!-- Font Size Setting -->
      <div class="setting-item">
        <label class="block text-sm font-medium text-gray-700 mb-2"> 字体大小 </label>
        <NumberFieldRoot v-model="currentConfig.fontSize" class="inline-flex">
          <NumberFieldDecrement
            class="px-2 border border-r-0 border-gray-300 rounded-l-md hover:bg-gray-100 focus:outline-none"
          >
            <Icon icon="radix-icons:minus" />
          </NumberFieldDecrement>
          <NumberFieldInput
            class="w-[60px] px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 text-center"
            :min="12"
            :max="20"
          />
          <NumberFieldIncrement
            class="px-2 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-100 focus:outline-none"
          >
            <Icon icon="radix-icons:plus" />
          </NumberFieldIncrement>
        </NumberFieldRoot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'Settings' })

import { reactive, onMounted, watch } from 'vue'
import { Icon } from '@iconify/vue'
import {
  SelectContent,
  SelectGroup,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
  NumberFieldRoot,
  NumberFieldInput,
  NumberFieldIncrement,
  NumberFieldDecrement
} from 'radix-vue'
import { AppConfig } from '../types'

const languageOptions = [
  { label: '中文', value: 'zh' as const },
  { label: 'English', value: 'en' as const }
]

const currentConfig = reactive<AppConfig>({
  language: 'zh',
  fontSize: 14
})

onMounted(async () => {
  const config = await window.electronAPI.getConfig()
  Object.assign(currentConfig, config)
})

// 监听配置变化并自动保存
watch(
  currentConfig,
  async (newConfig) => {
    await window.electronAPI.updateConfig({
      language: newConfig.language,
      fontSize: newConfig.fontSize
    })
  },
  { deep: true }
)
</script>
