<template>
  <div class="search-input tags-input" @click="focusInput">
    <span
      v-for="(tag, index) in tags"
      :key="index"
      class="tag"
    >
      {{ tag.key }}:{{ tag.value }}
      <button @click.stop="removeTag(index)">×</button>
    </span>

    <input
      ref="inputRef"
      v-model="text"
      :placeholder="tags.length < 1 ? placeholder : ''"
      @keydown.enter.prevent="commitTagsFromInput"
      @keydown.space="handleSpace"
      @keydown.backspace="handleBackspace"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

export type Tag = {
  key: string
  value: string
}

const props = defineProps<{
  modelValue: Tag[]
  text: string
  allowedTags?: string[]
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Tag[]): void
  (e: 'update:text', value: string): void
}>()

const tags = ref<Tag[]>([...props.modelValue])
const text = ref(props.text)
const inputRef = ref<HTMLInputElement | null>(null)

watch(() => props.modelValue, v => tags.value = [...v])
watch(() => props.text, v => text.value = v)

watch(tags, v => emit('update:modelValue', v), { deep: true })
watch(text, v => emit('update:text', v))

const focusInput = () => inputRef.value?.focus()

const commitTagsFromInput = () => {
  const words = text.value.split(' ')

  let newTags: Tag[] = []
  let remainingText: string[] = []

  for (const word of words) {
    if (word.includes(':')) {
      const [key, ...rest] = word.split(':')
      const value = rest.join(':')
      if (!key || !value) {
        remainingText.push(word)
        continue
      }
      if (props.allowedTags && !props.allowedTags.includes(key)) {
        remainingText.push(word)
        continue
      }
      newTags.push({ key, value })
    } else {
      remainingText.push(word)
    }
  }

  if (newTags.length) {
    tags.value.push(...newTags)
    emit('update:modelValue', [...tags.value]) // ✅ emit immediately
  }

  text.value = remainingText.join(' ')
}

const handleSpace = (e: KeyboardEvent) => {
  const words = text.value.split(' ')
  if (!words.length) return

  const lastWord = words[words.length - 1]

  if (!lastWord.includes(':')) return

  const [key, ...rest] = lastWord.split(':')
  const value = rest.join(':')

  if (!key || !value) return
  if (props.allowedTags && !props.allowedTags.includes(key)) return

  e.preventDefault()
  tags.value.push({ key, value })
  emit('update:modelValue', [...tags.value]) // ✅ emit immediately
  words.pop()
  text.value = words.join(' ') + ' '
}

const removeTag = (index: number) => {
  tags.value.splice(index, 1)
  emit('update:modelValue', [...tags.value]) // ✅ emit immediately
}

const handleBackspace = () => {
  if (!text.value && tags.value.length) {
    tags.value.pop()
    emit('update:modelValue', [...tags.value]) // ✅ emit immediately
  }
}
</script>

<style lang="scss" scoped>
.tags-input {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  padding: 8px;
  margin: 8px 0;
  background: transparent;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: 0.2s;
  cursor: text;

  &:focus-within {
    border-radius: 12px;
  }

  input {
    all: unset;
    flex: 1;
    min-width: 120px;
    color: inherit;
    padding: 4px;
  }

  .tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 8px;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.5);
    font-size: 0.85em;
    white-space: nowrap;

    button {
      all: unset;
      cursor: pointer;
      opacity: 0.7;

      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
