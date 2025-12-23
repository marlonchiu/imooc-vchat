<template>
  <div class="theme-mode-switcher">
    <div class="flex gap-1 bg-gray-100 p-1 rounded-lg">
      <button
        v-for="mode in modes"
        :key="mode.value"
        @click="setMode(mode.value)"
        :class="[
          'flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all',
          currentMode === mode.value ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
        ]"
      >
        <Icon :icon="mode.icon" class="w-4 h-4" />
        <span>{{ t('theme.' + mode.value) }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'ThemeModeSwitcher' })

import { Icon } from '@iconify/vue'
import { ThemeMode } from '../types'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const modes = [
  { value: 'light', icon: 'ph:sun-bold' },
  { value: 'dark', icon: 'ph:moon-bold' },
  { value: 'system', icon: 'ph:monitor-bold' }
] as const

const currentMode = defineModel<ThemeMode>({ default: 'light' })

const setMode = (mode: ThemeMode) => {
  currentMode.value = mode
}
</script>
