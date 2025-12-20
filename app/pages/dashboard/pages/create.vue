<template>
  <div>
    <div class="topbar">
      <button @click="$router.back()"><Icon name="pixelarticons:chevron-left" /></button>
      <p>Create a new page</p>
    </div>
    <div class="user-editor">
      <div class="editing">
        <label for="slug">Slug</label>
        <input id="slug" v-model="form.slug">

        <label for="name">Name</label>
        <input id="name" v-model="form.name">

        <label for="domain">Domain</label>
        <input id="domain" v-model="form.cname" placeholder="example.com">

        <label for="title">Title</label>
        <input id="title" v-model="form.title">

        <p><Button @click="submitNewUser" :disabled="isProcessing">Create new page</Button></p>
        <p v-show="errorMessage != ''" class="error-text">{{ errorMessage }}</p>
      </div>
      <div class="editing" />
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['require-auth'],
  accessLevel: 90,
  layout: 'dashboard'
})

useHead({ title: 'dashboard - pages - create' })

const route = useRoute();
const router = useRouter();

const errorMessage = ref('');
const isProcessing = ref(false);

type PageForm = {
  _id: string
  slug: string
  name: string
  title: string
  cname: string
  tags: string[]
  managers: string[]
  groups: string[]
  footerOverride: string
  createdAt: string
  updatedAt: string
}

const form = ref<PageForm>({
  _id: '',
  slug: '',
  name: '',
  title: '',
  cname: '',
  tags: [],
  managers: [],
  groups: [],
  footerOverride: '',
  createdAt: 'unknown',
  updatedAt: 'unknown'
})
async function submitNewUser() {
  isProcessing.value = true;
  const payload: Record<string, any> = {};
  if (form.value.slug) payload.slug = form.value.slug;
  if (form.value.name) payload.name = form.value.name;
  if (form.value.title !== null) payload.title = form.value.title;
  if (form.value.cname) payload.cname = form.value.cname;
  try {
    await $fetch(`/api/v1/page/create`, {
      method: 'POST',
      body: payload
    });
    router.back();
    isProcessing.value = false;
  } catch (err) {
    errorMessage.value = err.data.statusMessage;
    console.error(err);
    isProcessing.value = false;
  }
}

</script>

<style lang="scss" scoped>
@use '~/assets/scss/dashboard.scss';
</style>