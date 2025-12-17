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
          <TooltipAvatar v-for="manager in page.managers.splice(0,6)" :key="manager._id" :name="manager._id" :tooltip-content="manager.name" />
          <span v-show="page.managers.length < 1">None</span>
        </td>
        <td>{{ page.createdAt ?? 'Unknown' }}</td>
        <td><NuxtLink :to="`/dashboard/pages/edit/${page._id}`" class="button">Edit</NuxtLink></td>
      </tr>
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

td
{
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

tr:not(:nth-child(1)):hover
{
  background: rgba(0,0,0,0.1);
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

.searchbox
{
  padding: 8px;
  width: 95%;
  display: flex;
  align-items: center;

  .search-input
  {
    flex: 1;
  }

  .search-filters
  {
    flex: 1;
    display: flex;
    flex-direction: row-reverse;
    gap: 8px;
  }
}

.button {
  display: block;
  padding: 8px 16px;
  font-size: 12px;
  float: right;
  margin: 12px;
  background: transparent;
  outline: none;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  will-change: border-radius;
  transition: 0.2s;
  text-decoration: none;

  &:hover {
    border-radius: 12px;
  }
}

td.managers-list ::v-deep svg:not(:first-child) {
  margin-left: -24px;
  transition: 0.2s;
}

td.managers-list:hover ::v-deep svg {
  margin-left: 0;
}

</style>
