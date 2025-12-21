<template>
  <div>
    <div class="topbar">
      <button @click="$router.back()"><Icon name="pixelarticons:chevron-left" /></button>
      <p>Editing {{ form.name }}</p>
      <AlertDialogRoot>
        <AlertDialogTrigger class="danger" :disabled="form.slug === 'default'">
          Delete
        </AlertDialogTrigger>
        <AlertDialogPortal>
          <AlertDialogOverlay class="AlertDialogOverlay" />
          <AlertDialogContent class="AlertDialogContent">
            <AlertDialogTitle class="AlertDialogTitle">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription class="AlertDialogDescription">
              This action cannot be undone. This will permanently delete this page and remove all the data from the servers.
            </AlertDialogDescription>
            <div :style="{ display: 'flex', gap: 25, justifyContent: 'flex-end' }" style="gap: 16px;">
              <AlertDialogCancel>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                class="danger"
                @click="()=>{}"
              >
                Yes, delete
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialogPortal>
      </AlertDialogRoot>
    </div>

    <div v-show="form.slug === 'default'" style="width: 95%; margin: 12px 0;">
      <div class="alert-box alert-box--info">
        <h2 class="title">Notice</h2>
        <p>Because this is a default page you cannot edit it's slug and cannot delete it, additionally all domains that don't have their own page will show this page.</p>
      </div>
    </div>

    <div class="user-editor">
      <div class="preview">
        <div class="avatar-box">
          <Avatar :size="200" :name="form._id" variant="marble" />
        </div>
      </div>

      <div class="editing">
        <label for="id">ID</label>
        <input id="id" :value="form._id" class="disabled" readonly @focus="selectAll">

        <label for="slug">Slug</label>
        <input
        id="slug"
        v-model="form.slug"
        :readonly="form.slug === 'default'"
        :class="{
          'disabled': form.slug === 'default'
        }">

        <label for="name">Name</label>
        <input id="name" v-model="form.name">

        <label for="domain">Domain</label>
        <input id="domain" v-model="form.cname" placeholder="example.com">

        <label
        for="managers"
        :style="{
          display: 'block',
          marginBottom: '8px'
        }">Managers</label>
        <UserInput
        id="managers"
        v-model="users"
        placeholder="Add users..." />

        <br>

        <label for="createdat">Created</label>
        <input id="createdat" :value="form.createdAt ?? 'Unknown'" class="disabled noborder" readonly @focus="selectAll">

        <label for="changedat">Last Change</label>
        <input id="changedat" :value="form.updatedAt ?? 'Unknown'" class="disabled noborder" readonly @focus="selectAll">

        <p>
          <button @click="submitChanges">Submit changes</button>
        </p>

        <p v-show="errorMessage != ''" class="error-text">{{ errorMessage }}</p>
      </div>

      <div class="editing">
        <label for="title">Title</label>
        <input id="title" v-model="form.title">
        <br>
        <label for="customfooter">Custom Footer (allows HTML)</label>
        <textarea id="customfooter" v-model="form.footerOverride" />
        <br>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Avatar from 'vue-boring-avatars';

definePageMeta({
  middleware: ['require-auth'],
  accessLevel: 90,
  layout: 'dashboard'
})

useHead({ title: 'dashboard - pages - editing' })

const route = useRoute();
const router = useRouter();

type PageForm = {
  _id: string
  slug: string
  name: string
  title: string
  cname: string
  tags: string[]
  managers: IUser[]
  groups: string[]
  footerOverride: string
  createdAt: string
  updatedAt: string
}

interface IUser {
  username: string
  name: string
  password: string
  access_level?: number
  created_at?: Date
}

const users = ref<IUser[]>([])

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

const originalForm = ref<PageForm | null>(null)

const errorMessage = ref('');

const { data: pageInfo } = await useFetch(`/api/v1/page/fetch/${route.params.id}`, {});

if (pageInfo.value?.page) {
  Object.assign(form.value, pageInfo.value.page);
  originalForm.value = structuredClone(toRaw(form.value));
  users.value = form.value.managers ?? [];
}

function selectAll(event: FocusEvent) {
  const target = event.target as HTMLInputElement;
  target.select();
}

async function submitChanges() {
  if (!originalForm.value) return

  form.value.managers = users.value
  
  const payload = buildPatchPayload(originalForm.value, form.value)

  if (Object.keys(payload).length === 0) {
    router.back()
    return
  }

  try {
    await $fetch(`/api/v1/page/modify/${form.value._id}`, {
      method: 'POST',
      body: payload
    })
    router.back()
  } catch (err: any) {
    errorMessage.value = err?.data?.statusMessage ?? 'Unknown error'
    console.error(err)
  }
}

</script>


<style lang="scss" scoped>
@use '~/assets/scss/dashboard.scss';

.info-card
{
  vertical-align: middle;
  padding: 4px 8px;
  padding-left: 12px;
  background: rgba(0,0,0,0.1);
}

h3 { span { vertical-align: middle; }}

.sessions
{
  display: block;
  position: flex;
  flex-direction: column;

  .session
  {
    display: flex;
    margin: 12px 0;
    border-bottom: 1px solid rgba(255,255,255, 0.1);
    align-items: center;

    .content
    {
      flex: 1;
      padding: 24px;
      
      p
      {
        margin: 0;
        padding: 0;
        color: rgba(255,255,255,0.6);
      }
    }
    
  }
}
</style>