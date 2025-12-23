<template>
  <div class="theme-switcher dark:bg-gray-800 rounded-lg">
    <!-- 主题色选择器 -->
    <div v-if="availableThemes.length > 0" class="flex gap-2">
      <button
        v-for="theme in availableThemes"
        :key="theme.value"
        @click="setTheme(theme.value)"
        class="w-6 h-6 rounded-full"
        :class="bgClass(theme.value)"
      >
        <svg
          v-if="currentTheme === theme.value"
          class="w-4 h-4 m-auto text-white"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'ThemeSwitcher' })

import { computed } from 'vue'

const availableThemes = [
  { value: 'green', label: 'Green' },
  { value: 'purple', label: 'Purple' },
  { value: 'rose', label: 'Rose' },
  { value: 'amber', label: 'Amber' },
  { value: 'pink', label: 'Pink' }
]

const currentTheme = defineModel<string>({ default: 'green' })

const bgClass = computed(() => {
  return (theme: string) => {
    switch (theme) {
      case 'green':
        return 'bg-green-700'
      case 'purple':
        return 'bg-purple-700'
      case 'rose':
        return 'bg-rose-700'
      case 'amber':
        return 'bg-amber-600'
      case 'pink':
        return 'bg-pink-600'
    }
  }
})
const setTheme = (theme: string) => {
  currentTheme.value = theme
}
</script>
