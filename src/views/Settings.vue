<template>
  <div class="w-[80%] mx-auto p-8">
    <h1 class="text-2xl font-bold mb-8">{{ t('settings.title') }}</h1>

    <TabsRoot v-model="activeTab" class="w-full">
      <TabsList class="flex border-b border-gray-200 mb-6">
        <TabsTrigger
          value="general"
          class="px-4 py-2 -mb-[1px] text-sm font-medium text-gray-600 hover:text-gray-800 data-[state=active]:text-primary-600 data-[state=active]:border-b-2 data-[state=active]:border-primary-700"
        >
          {{ t('settings.general') }}
        </TabsTrigger>
        <TabsTrigger
          value="models"
          class="px-4 py-2 -mb-[1px] text-sm font-medium text-gray-600 hover:text-gray-800 data-[state=active]:text-primary-600 data-[state=active]:border-b-2 data-[state=active]:border-primary-700"
        >
          {{ t('settings.models') }}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="general" class="space-y-6 max-w-[500px]">
        <!-- Theme Mode Setting -->
        <div class="setting-item flex items-center gap-8">
          <label class="text-sm font-medium text-gray-700 w-24">
            {{ t('settings.themeMode') }}
          </label>
          <ThemeModeSwitcher v-model="currentConfig.themeMode" />
        </div>

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
          <NumberFieldRoot v-model="clampedFontSize" class="inline-flex w-[100px]">
            <NumberFieldDecrement
              class="px-2 border border-r-0 border-gray-300 rounded-l-md hover:bg-gray-100 focus:outline-none"
            >
              <Icon icon="radix-icons:minus" />
            </NumberFieldDecrement>
            <NumberFieldInput
              class="w-10 px-2 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-500 text-center"
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

        <!-- theme color setting -->
        <div class="setting-item flex items-center gap-8">
          <label class="text-sm font-medium text-gray-700 w-24">
            {{ t('settings.themeColor') }}
          </label>
          <ThemeColorSwitcher v-model="currentConfig.theme" />

          <Button class="bg-primary-700" size="small">{{ t('settings.themeColor') }}</Button>
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
                <div
                  v-for="config in getProviderConfig(provider.name)"
                  :key="config.key"
                  class="flex items-center gap-4"
                >
                  <label class="text-sm font-medium text-gray-700 w-24">{{ config.label }}</label>
                  <input
                    :type="config.type"
                    :placeholder="config.placeholder"
                    :required="config.required"
                    :value="config.value"
                    @input="
                      (e) => updateProviderConfig(provider.name, config.key, (e.target as HTMLInputElement).value)
                    "
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
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
import { AppConfig, ThemeMode } from '../types'

import { useProviderStore } from '../stores/provider'
import Button from '../components/Button.vue'
import ThemeColorSwitcher from '../components/ThemeColorSwitcher.vue'
import ThemeModeSwitcher from '../components/ThemeModeSwitcher.vue'
import { providerConfigs, ProviderConfigItem } from '../config/providerConfig'
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
  fontSize: 16,
  theme: 'green',
  themeMode: 'system',
  providerConfigs: {}
})

// 字体大小限制在 12-20px
const clampedFontSize = computed({
  get: () => currentConfig.fontSize,
  set: (val) => {
    currentConfig.fontSize = Math.max(12, Math.min(20, val))
  }
})

onMounted(async () => {
  const config = await window.electronAPI.getConfig()
  Object.assign(currentConfig, config)
  // 应用主题色
  applyThemeColor(currentConfig.theme)
  // 应用主题模式
  applyThemeMode(currentConfig.themeMode)
  // 应用字体大小
  applyFontSize(currentConfig.fontSize)
})

// 监听配置变化并自动保存
watch(
  currentConfig,
  async (newConfig) => {
    const configToSave = {
      language: newConfig.language,
      fontSize: newConfig.fontSize,
      theme: newConfig.theme,
      themeMode: newConfig.themeMode,
      providerConfigs: JSON.parse(JSON.stringify(newConfig.providerConfigs))
    }
    await window.electronAPI.updateConfig(configToSave)
    // 更新界面语言
    setI18nLanguage(newConfig.language)
    // 更新主题色
    applyThemeColor(newConfig.theme)
    // 更新主题模式
    applyThemeMode(newConfig.themeMode)
    // 更新字体大小
    applyFontSize(newConfig.fontSize)
  },
  { deep: true }
)

// 应用主题色
const applyThemeColor = (theme: string) => {
  document.documentElement.setAttribute('data-theme', theme)
}

// 应用主题模式 (light/dark/system)
const applyThemeMode = (mode: ThemeMode) => {
  document.documentElement.setAttribute('data-theme-mode', mode)
}

// 应用字体大小
const applyFontSize = (size: number) => {
  document.documentElement.style.fontSize = `${size}px`
}

// 获取provider对应的配置项
const getProviderConfig = (providerName: string): ProviderConfigItem[] => {
  const configs = providerConfigs[providerName] || []
  // 确保配置值被初始化
  if (!currentConfig.providerConfigs[providerName]) {
    currentConfig.providerConfigs[providerName] = {}
  }
  return configs.map((config) => ({
    ...config,
    value: currentConfig.providerConfigs[providerName][config.key] || config.value
  }))
}

// 更新provider配置值
const updateProviderConfig = (providerName: string, key: string, value: string) => {
  if (!currentConfig.providerConfigs[providerName]) {
    currentConfig.providerConfigs[providerName] = {}
  }
  currentConfig.providerConfigs[providerName][key] = value
}
</script>
