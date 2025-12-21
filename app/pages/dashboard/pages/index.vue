<template>
  <div>
    <div class="searchbox">
      <div class="search-input">
        <TaggedInput
          v-model="tags"
          v-model:text="search"
          :allowed-tags="['slug', 'manager', 'group', 'domain', 'tag']"
          placeholder="Search by name or title"
        />
      </div>
      <div class="search-filters">
        <NuxtLink to="/dashboard/pages/create" class="button">New Page</NuxtLink>
      </div>
    </div>

    <table>
      <tbody>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Slug</th>
          <th>Managers</th>
          <th>Creation Date</th>
          <th></th>
        </tr>
        <tr v-if="pages.length < 1">
          <td>&nbsp;</td>
          <td>No pages yet!</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr v-for="(page, index) in pages" :key="page._id">
          <td><Avatar :name="page._id" variant="marble" /></td>
          <td>{{ page.name }}</td>
          <td>{{ page.slug }}</td>
          <td class="managers-list">
            <Avatar v-for="manager in page.managers.slice(0,6)" :key="manager" :name="manager" variant="beam" />
            <span v-show="page.managers.length === 0">None</span>
          </td>
          <td>{{ page.createdAt ?? 'Unknown' }}</td>
          <td><NuxtLink :to="`/dashboard/pages/edit/${page._id}`" class="button">Edit</NuxtLink></td>
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
  accessLevel: 60,
  layout: 'dashboard'
})

useHead({ title: 'dashboard - pages' })

const page = ref(1)
const limit = 50
const sorting = ref<'asc' | 'desc'>('asc')
const search = ref('')
const tags = ref<{ key: string; value: string }[]>([])

const offset = computed(() => (page.value - 1) * limit)

interface PagesResponse {
  pages: any[]
  count: number
}

let pagesListing = ref<PagesResponse>({ pages: [], count: 0 })

const fetchpages = () => useFetch<PagesResponse>('/api/v1/page/fetch', {
  query: {
    offset: offset.value,
    sort: sorting.value,
    search: search.value || undefined,
    "tags[]": tags.value.map(tag => `${tag.key}:${tag.value}`)
  }
})

const refresh = async () => {
  const { data } = await fetchpages()
  pagesListing.value = data.value ?? { pages: [], count: 0 }
  console.log(pagesListing.value);
}

watch([page, sorting], () => refresh(), { immediate: true })

const debouncedSearch = useDebounceFn(() => {
  page.value = 1
  refresh()
}, 300)
watch([search, tags], debouncedSearch)
const pages = computed(() => pagesListing.value.pages)
const totalCount = computed(() => pagesListing.value.count)
const totalPages = computed(() => Math.ceil(totalCount.value / limit))

function nextPage() {
  if (page.value < totalPages.value) page.value++
}

function prevPage() {
  if (page.value > 1) page.value--
}

</script>


<style lang="scss" scoped>
@use '~/assets/scss/dashboard.scss';
</style>
