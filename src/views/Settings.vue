<template>
  <div class="w-[80%] mx-auto p-8">
    <h1 class="text-2xl font-bold mb-8">{{ t('settings.title') }}</h1>

    <TabsRoot v-model="activeTab" class="w-full">
      <TabsList class="flex border-b border-gray-200 mb-6">
        <TabsTrigger
          value="general"
          class="px-4 py-2 -mb-[1px] text-sm font-medium text-gray-600 hover:text-gray-800 data-[state=active]:text-green-600 data-[state=active]:border-b-2 data-[state=active]:border-green-600"
        >
          {{ t('settings.general') }}
        </TabsTrigger>
        <TabsTrigger
          value="models"
          class="px-4 py-2 -mb-[1px] text-sm font-medium text-gray-600 hover:text-gray-800 data-[state=active]:text-green-600 data-[state=active]:border-b-2 data-[state=active]:border-green-600"
        >
          {{ t('settings.models') }}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="general" class="space-y-6 max-w-[500px]">
        <!-- Language Setting -->
        <div class="setting-item flex items-center gap-8">
          <label class="text-sm font-medium text-gray-700 w-24">
            {{ t('settings.language') }}
          </label>
          <SelectRoot v-model="currentConfig.language" class="w-[160px]">
            <SelectTrigger
              class="inline-flex items-center justify-between rounded-md px-3 py-2 text-sm gap-1 bg-white border border-gray-300"
            >
              <SelectValue :placeholder="t('settings.selectLanguage')" />
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
                      <SelectItemText>{{ t('common.chinese') }}</SelectItemText>
                      <SelectItemIndicator class="absolute left-2 inline-flex items-center">
                        <Icon icon="radix-icons:check" />
                      </SelectItemIndicator>
                    </SelectItem>
                    <SelectItem
                      value="en"
                      class="relative flex items-center px-8 py-2 text-sm text-gray-700 rounded-md cursor-default hover:bg-gray-100"
                    >
                      <SelectItemText>{{ t('common.english') }}</SelectItemText>
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
        <div class="setting-item flex items-center gap-8">
          <label class="text-sm font-medium text-gray-700 w-24">
            {{ t('settings.fontSize') }}
          </label>
          <NumberFieldRoot v-model="currentConfig.fontSize" class="inline-flex w-[100px]">
            <NumberFieldDecrement
              class="px-2 border border-r-0 border-gray-300 rounded-l-md hover:bg-gray-100 focus:outline-none"
            >
              <Icon icon="radix-icons:minus" />
            </NumberFieldDecrement>
            <NumberFieldInput
              class="w-10 px-2 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 text-center"
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
      </TabsContent>

      <TabsContent value="models" class="space-y-4">
        <AccordionRoot type="single" collapsible>
          <AccordionItem
            v-for="provider in providers"
            :key="provider.id"
            :value="provider.name"
            class="border rounded-lg mb-2"
          >
            <AccordionTrigger class="flex items-center justify-between w-full p-4 text-left">
              <div class="flex items-center gap-2">
                <img :src="provider.avatar" :alt="provider.name" class="w-6 h-6 rounded" />
                <span class="font-medium">{{ provider.title }}</span>
              </div>
              <Icon
                icon="radix-icons:chevron-down"
                class="transform transition-transform duration-200 ease-in-out data-[state=open]:rotate-180"
              />
            </AccordionTrigger>
            <AccordionContent class="p-4 pt-0">
              <div class="space-y-4">
                <div class="flex items-center gap-4">
                  <label class="text-sm font-medium text-gray-700 w-24">Access Key</label>
                  <input
                    type="text"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    placeholder="abcd"
                  />
                </div>
                <div class="flex items-center gap-4">
                  <label class="text-sm font-medium text-gray-700 w-24">Secret Key</label>
                  <input
                    type="password"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    placeholder="abcd"
                  />
                </div>
                <div class="flex items-center gap-4">
                  <label class="text-sm font-medium text-gray-700 w-24">Base URL</label>
                  <input
                    type="text"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    placeholder="abcd"
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </TabsContent>
    </TabsRoot>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'Settings' })

import { reactive, onMounted, watch, ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { AppConfig } from '../types'

import { useProviderStore } from '../stores/provider'
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
  NumberFieldDecrement,
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from 'radix-vue'
import { useI18n } from 'vue-i18n'
import { setI18nLanguage } from '../i18n'
const { t } = useI18n()

const activeTab = ref('general')
const providerStore = useProviderStore()
const providers = computed(() => providerStore.items)

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
    // 更新界面语言
    setI18nLanguage(newConfig.language)
  },
  { deep: true }
)
</script>
