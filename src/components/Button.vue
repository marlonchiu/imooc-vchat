<template>
  <button
    class="vk-button shadow-sm inline-flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none"
    :class="[colorClasses, sizeClasses]"
    :disabled="disabled"
  >
    <Icon :icon="iconWithLoading" class="mr-2" v-if="iconWithLoading" />
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
defineOptions({ name: 'VkButton' })

import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { ButtonColor } from '../types'

export type ButtonSize = 'large' | 'small'

export interface ButtonProps {
  color?: ButtonColor
  size?: ButtonSize
  plain?: boolean
  disabled?: boolean
  loading?: boolean
  iconName?: string
}

const props = withDefaults(defineProps<ButtonProps>(), {
  color: 'green'
})

// 主题色配置 - 通过 CSS 变量自动适配 green/purple 主题
const themeColors = {
  plain:
    'bg-primary-50 text-primary-700 hover:bg-primary-700 border border-primary-700 hover:text-white disabled:bg-primary-500',
  normal: 'bg-primary-700 text-white hover:bg-primary-700/90 border border-primary-700'
}

const colorClasses = computed(() => {
  return props.plain ? themeColors.plain : themeColors.normal
})

const sizeClasses = computed(() => {
  if (!props.size) {
    return 'h-[32px] py-[8px] px-[15px] text-sm rounded-[4px]'
  } else {
    if (props.size === 'large') {
      return 'h-[40px] py-[12px] px-[19px] rounded-[4px] text-base'
    } else {
      return 'h-[24px] py-[11px] px-[5px] rounded-[3px] text-xs'
    }
  }
})

const iconWithLoading = computed(() => {
  if (props.loading) {
    return 'line-md:loading-loop'
  } else {
    return props.iconName
  }
})
</script>
