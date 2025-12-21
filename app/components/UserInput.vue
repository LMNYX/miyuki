<template>
  <div class="user-input" @click="focusInput">
    <span
      v-for="user in selectedUsers"
      :key="user.username"
      class="user-tag"
    >
      <Avatar class="avatar" :name="user._id" variant="beam" />
      <span class="name">{{ user.name }}</span>
      <button @click.stop="removeUser(user.username)">×</button>
    </span>

    <input
      ref="inputRef"
      v-model="query"
      :placeholder="selectedUsers.length === 0 ? placeholder : ''"
      @keydown.backspace="handleBackspace"
    >

    <ul
      v-if="showDropdown"
      class="dropdown"
    >
      <li
        v-for="user in filteredUsers"
        :key="user.username"
        @mousedown.prevent="addUser(user)"
      >
        <Avatar class="avatar" :name="user._id" variant="beam" />
        <div class="info">
          <span class="name">{{ user.name }}</span>
          <span class="username">@{{ user.username }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import Avatar from 'vue-boring-avatars';
import { ref, computed, watch, onMounted } from 'vue'

export interface IUser {
  _id: string
  username: string
  name: string
  password?: string
  access_level?: number
  created_at?: Date
}

const props = defineProps<{
  modelValue: (IUser | string)[]
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const query = ref('')
const users = ref<IUser[]>([])
const selectedUsers = ref<IUser[]>([])

onMounted(async () => {
  const { data } = await useFetch<{ users: IUser[] }>('/api/v1/user/fetch')
  if (data.value?.users) {
    users.value = data.value.users
    updateSelectedUsers()
  }
})

const updateSelectedUsers = () => {
  selectedUsers.value = props.modelValue.map(u => {
    if (typeof u === 'string') {
      return users.value.find(user => user._id === u) ?? { _id: u, username: u, name: 'Unknown' }
    }
    return u
  })
}

watch(() => props.modelValue, updateSelectedUsers, { immediate: true })

const filteredUsers = computed(() => {
  const q = query.value.toLowerCase()
  return users.value.filter(user =>
    !selectedUsers.value.some(u => u._id === user._id) &&
    (user.name.toLowerCase().includes(q) || user.username.toLowerCase().includes(q))
  )
})

const showDropdown = computed(() => query.value.length > 0 && filteredUsers.value.length > 0)

watch(
  selectedUsers,
  v => emit('update:modelValue', v.map(u => u._id)),
  { deep: true }
)

const focusInput = () => {
  inputRef.value?.focus()
}

const addUser = (user: IUser) => {
  selectedUsers.value.push(user)
  query.value = ''
}

const removeUser = (id: string) => {
  selectedUsers.value = selectedUsers.value.filter(u => u._id !== id)
}

const handleBackspace = () => {
  if (!query.value && selectedUsers.value.length) {
    selectedUsers.value.pop()
  }
}
</script>

<style scoped lang="scss">
.user-input {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  cursor: text;

  &:focus-within {
    border-radius: 12px;
  }

  input {
    all: unset;
    flex: 1;
    min-width: 120px;
    padding: 4px;
  }
}

.user-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.5);
  font-size: 0.85em;

  .avatar {
    width: 18px;
    height: 18px;
    border-radius: 50%;
  }

  button {
    all: unset;
    cursor: pointer;
    opacity: 0.7;

    &:hover {
      opacity: 1;
    }
  }
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background: #111;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  max-height: 240px;
  overflow-y: auto;
  z-index: 10;

  li {
    display: flex;
    gap: 8px;
    padding: 8px;
    cursor: pointer;

    &:hover {
      background: rgba(255, 255, 255, 0.05);
    }

    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }

    .info {
      display: flex;
      flex-direction: column;

      .name {
        font-weight: 600;
      }

      .username {
        font-size: 0.8em;
        opacity: 0.7;
      }
    }
  }
}
</style>
