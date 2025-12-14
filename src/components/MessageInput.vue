<template>
  <div
    class="message-input w-full shadow-sm border rounded-lg border-gray-300 flex items-center py-1 px-2 focus-within:border-green-700"
  >
    <input
      class="outline-none border-0 flex-1 bg-white focus:ring-0"
      type="text"
      :disabled="disabled"
      v-model="model"
    />

    <Button icon-name="radix-icons:paper-plane" :disabled="disabled" @click="onCreate"> 发送 </Button>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'MessageInput' })

import Button from '../components/Button.vue'

defineProps<{
  disabled?: boolean
}>()

const emit = defineEmits<{
  create: [value: string]
}>()

const model = defineModel<string>()

const onCreate = () => {
  if (model.value && model.value.trim() !== '') {
    emit('create', model.value)
  }
}
</script>
