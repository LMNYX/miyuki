<template>
  <div>
    <p>Users</p>

    <table>
      <tr>
        <th>#</th>
        <th>Username</th>
        <th>Name</th>
        <th>Role</th>
        <th>Creation Date</th>
        <th>Actions</th>
      </tr>

      <tr v-for="(user, index) in users" :key="user.username">
        <td>{{ rowIndex(index) }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.name }}</td>
        <td>{{ convertAccessLevelToString(user.access_level) }}</td>
        <td>{{ user.createdAt }}</td>
        <td><button>Nothing</button></td>
      </tr>
    </table>

    <div class="pagination">
      <button @click="prevPage" :disabled="page === 1"><Icon name="pixelarticons:chevron-left" /></button>
      <span>{{ page }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="page === totalPages"><Icon name="pixelarticons:chevron-right" /></button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

definePageMeta({
  middleware: ['require-auth'],
  accessLevel: 90,
  layout: 'dashboard'
})

useHead({ title: 'dashboard - users' })


const page = ref(1)
const limit = 50
const sorting = ref<'asc' | 'desc'>('asc')

const offset = computed(() => (page.value - 1) * limit)

const { data: usersListing, refresh } = await useFetch('/api/v1/user/get', {
  query: computed(() => ({
    offset: offset.value,
    sort: sorting.value
  })),
  watch: [offset, sorting]
})

const users = computed(() => usersListing.value?.users ?? [])
const totalCount = computed(() => usersListing.value?.count ?? 0)
const totalPages = computed(() => Math.ceil(totalCount.value / limit))

function nextPage() {
  if (page.value < totalPages.value) page.value++
}

function prevPage() {
  if (page.value > 1) page.value--
}

function rowIndex(index: number) {
  if (sorting.value === 'asc') {
    return offset.value + index + 1
  }
  return totalCount.value - offset.value - index
}

function convertAccessLevelToString(accessLevel: number) {
  if (accessLevel < 30) return 'Guest'
  if (accessLevel < 60) return 'Editor'
  if (accessLevel < 90) return 'Administrator'
  return 'Superadministrator'
}
</script>

<style lang="scss" scoped>
table, th, td {
  border: none;
  padding: 8px 16px;
  text-align: left;
}

table {
  width: 95%;
}

th {
  color: #7c7c7c;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

th:nth-child(1),
td:nth-child(1) {
  width: 32px;
}

.pagination {
  margin-top: 48px;
  width: 95%;
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;

  button
  {
    border: 1px solid transparent;
    border-radius: 12px;

    &:hover
    {
      border: 1px solid rgba(255,255,255,0.1);
    }
  }
}
</style>
