<template>
  <div>
    <div class="searchbox">
      <div class="search-input">
        <TaggedInput
          v-model="tags"
          v-model:text="search"
          :allowed-tags="[]"
          placeholder="Search by username or name"
        />
      </div>
      <div class="search-filters">
        <NuxtLink to="/dashboard/users/create" class="button">New User</NuxtLink>
      </div>
    </div>

    <table>
      <tbody>
        <tr>
          <th></th>
          <th>Username</th>
          <th>Name</th>
          <th>Role</th>
          <th>Creation Date</th>
          <th></th>
        </tr>
        <tr v-if="users.length < 1">
          <td>&nbsp;</td>
          <td>No users yet!</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr v-for="(user, index) in users" :key="user._id">
          <td><Avatar :name="user._id" variant="beam" /></td>
          <td>{{ user.username }}</td>
          <td>{{ user.name }}</td>
          <td>{{ convertAccessLevelToString(user.access_level) }}</td>
          <td>{{ user.createdAt }}</td>
          <td><NuxtLink :to="`/dashboard/users/edit/${user._id}`" class="button">Edit</NuxtLink></td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button :disabled="page === 1" @click="prevPage"><Icon name="pixelarticons:chevron-left" /></button>
      <span>{{ page }} / {{ totalPages }}</span>
      <button :disabled="page === totalPages" @click="nextPage"><Icon name="pixelarticons:chevron-right" /></button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import Avatar from 'vue-boring-avatars';

definePageMeta({
  middleware: ['require-auth'],
  accessLevel: 90,
  layout: 'dashboard'
})

useHead({ title: 'dashboard - users' })

const page = ref(1)
const limit = 50
const sorting = ref<'asc' | 'desc'>('asc')
const search = ref('')
const tags = ref<{ key: string; value: string }[]>([])

const offset = computed(() => (page.value - 1) * limit)

let usersListing = ref<{ users: any[]; count: number }>({ users: [], count: 0 })

const fetchUsers = () => useFetch('/api/v1/user/fetch', {
  query: {
    offset: offset.value,
    sort: sorting.value,
    search: search.value || undefined,
    "tags[]": tags.value.map(tag => `${tag.key}:${tag.value}`)
  }
})

const refresh = async () => {
  const { data } = await fetchUsers()
  usersListing.value = data.value ?? { users: [], count: 0 }
}

watch([page, sorting], () => refresh(), { immediate: true })

const debouncedSearch = useDebounceFn(() => {
  page.value = 1
  refresh()
}, 300)
watch([search, tags], debouncedSearch)

const users = computed(() => usersListing.value.users)
const totalCount = computed(() => usersListing.value.count)
const totalPages = computed(() => Math.ceil(totalCount.value / limit))

function nextPage() {
  if (page.value < totalPages.value) page.value++
}

function prevPage() {
  if (page.value > 1) page.value--
}

function rowIndex(index: number) {
  return sorting.value === 'asc'
    ? offset.value + index + 1
    : totalCount.value - offset.value - index
}

function convertAccessLevelToString(accessLevel: number) {
  if (accessLevel < 30) return 'Guest'
  if (accessLevel < 60) return 'Editor'
  if (accessLevel < 90) return 'Administrator'
  return 'Owner'
}
</script>


<style lang="scss" scoped>
@use '~/assets/scss/dashboard.scss';
</style>
