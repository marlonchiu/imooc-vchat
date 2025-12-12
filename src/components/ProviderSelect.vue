<template>
  <div class="provider-select">
    <SelectRoot>
      <SelectTrigger>
        <SelectValue placeholder="Select a model..." />
      </SelectTrigger>
      <SelectPortal>
        <SelectContent>
          <SelectViewport>
            <div v-for="(provider, index) in items">
              <SelectLabel>
                <img :src="provider.avatar" :alt="provider.name" />
                {{ provider.name }}
              </SelectLabel>
              <SelectGroup>
                <SelectItem v-for="(model, index) in provider.models" :key="index" :value="model">
                  <SelectItemText>{{ model }}</SelectItemText>
                </SelectItem>
              </SelectGroup>
              <SelectSeparator v-if="index !== items.length - 1" class="h-[1px] my-2 bg-gray-300" />
            </div>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'ProviderSelect' })

import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPortal,
  SelectRoot,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectViewport
} from 'radix-vue'
import { ProviderProps } from '../types'
defineProps<{ items: ProviderProps[] }>()
</script>
