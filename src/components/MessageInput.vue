<template>
  <div
    class="message-input w-full shadow-sm border rounded-lg border-gray-300 flex items-center py-1 px-2 focus-within:border-green-700"
  >
    <input class="outline-none border-0 flex-1 bg-white focus:ring-0" type="text" v-model="model" />
    <button
      class="shadow-sm inline-flex items-center justify-center bg-green-700 text-white hover:bg-green-700/90 border border-green-700 h-[32px] py-[8px] px-[15px] text-sm rounded-[4px]"
      @click="onCreate"
    >
      <Icon icon="radix-icons:paper-plane" class="mr-2"></Icon>
      发送
    </button>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'MessageInput' })

import { Icon } from '@iconify/vue'

const emit = defineEmits<{
  create: [value: string]
}>()

const model = defineModel<string>()

const onCreate = () => {
  if (model.value.trim() !== '') {
    emit('create', model.value)
  }
}
</script>
