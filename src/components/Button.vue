<template>
  <button class="vk-button shadow-sm inline-flex items-center justify-center" :class="[colorClasses]">
    <slot></slot>
  </button>

  <!--

  <button
            class="bg-green-700 text-white hover:bg-green-700/90 border border-green-700 h-[32px] py-[8px] px-[15px] text-sm rounded-[4px]"
          >
            <Icon icon="radix-icons:chat-bubble" class="mr-2"></Icon>
            新建聊天
          </button>
   <button
            class=" bg-green-50 text-green-700 hover:bg-green-700 border border-green-700 hover:text-white h-[32px] py-[8px] px-[15px] text-sm rounded-[4px]"
          >
            <Icon icon="radix-icons:gear" class="mr-2"></Icon>
            应用设置
          </button> -->
</template>

<script lang="ts" setup>
defineOptions({ name: 'VkButton' })

import { computed } from 'vue'

export type ButtonColor = 'green' | 'purple'
export type ButtonSize = 'large' | 'small'

export interface ButtonProps {
  color?: ButtonColor
  size?: ButtonSize
  plain?: boolean
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  color: 'green'
})

const colorVariants: Record<ButtonColor, any> = {
  green: {
    plain: 'bg-green-50 text-green-700 hover:bg-green-700 border border-green-700 hover:text-white',
    normal: 'bg-green-700 text-white hover:bg-green-700/90 border border-green-700'
  },
  purple: {
    plain:
      'bg-purple-50 text-purple-700 hover:bg-purple-700 border border-purple-700 hover:text-white disabled:bg-purple-500',
    normal: 'bg-purple-700 text-white hover:bg-purple-700/90 border border-purple-700'
  }
}

const colorClasses = computed(() => {
  if (props.plain) {
    return colorVariants[props.color].plain
  } else {
    return colorVariants[props.color].normal
  }
})
</script>
