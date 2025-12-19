<template>
  <div class="message-input w-full shadow-sm border rounded-lg border-gray-300 py-1 px-2 focus-within:border-green-700">
    <div v-if="imagePreview" class="mb-2 relative flex items-center">
      <img :src="imagePreview" alt="Preview" class="h-24 w-24 object-cover rounded" />
    </div>
    <div class="flex items-center">
      <input type="file" accept="image/*" ref="fileInput" class="hidden" @change="handleImageUpload" />

      <!-- icon显示不出来 -->
      <!-- icon="radix-icons:image" -->
      <Icon
        icon="radix-icons:chat-bubble"
        width="24"
        height="24"
        :class="[
          'mr-2',
          disabled ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 cursor-pointer hover:text-gray-600'
        ]"
        @click="triggerFileInput"
      />
      <input
        class="outline-none border-0 flex-1 bg-white focus:ring-0"
        type="text"
        :disabled="disabled"
        v-model="model"
      />

      <Button icon-name="radix-icons:paper-plane" :disabled="disabled" @click="onCreate">{{ t('common.send') }}</Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'MessageInput' })

import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import Button from '../components/Button.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps<{
  disabled?: boolean
}>()

const emit = defineEmits<{
  create: [value: string, imagePath?: string]
}>()

const model = defineModel<string>()
const fileInput = ref<HTMLInputElement | null>(null)
const imagePreview = ref('')

const triggerFileInput = () => {
  if (!props.disabled) {
    fileInput.value?.click()
  }
}

let selectedImage: File | null = null
const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    selectedImage = target.files[0]
    console.log('🚀 ~ handleImageUpload ~ selectedImage:', selectedImage)
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string // base64
    }
    reader.readAsDataURL(selectedImage)
  }
}

const onCreate = () => {
  if (model.value && model.value.trim() !== '') {
    // emit 子组件向父组件传递数据或触发事件，最新版的 File 对象移除了 path属性
    // emit('create', model.value, selectedImage?.path || undefined)
    if (selectedImage) {
      const filePath = window.electronAPI.getFilePath(selectedImage)
      console.log('🚀 ~ origin ~ filePath:', filePath)
      emit('create', model.value, filePath)
    } else {
      emit('create', model.value)
    }
    selectedImage = null
    imagePreview.value = ''
  }
}
</script>
