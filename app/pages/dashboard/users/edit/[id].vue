<template>
  <div>
    <div class="topbar">
      <button @click="$router.back()"><Icon name="pixelarticons:chevron-left" /></button>
      <p>Editing {{ form.name }}</p>
      <button class="danger" @click="deleteUser">Delete user</button>
    </div>

    <div class="user-editor">
      <div class="preview">
        <div class="avatar-box">
          <Avatar :size="200" :name="form._id" variant="beam" />
        </div>
      </div>

      <div class="editing">
        <label for="id">ID</label>
        <input id="id" :value="form._id" class="disabled" readonly @focus="selectAll" />

        <label for="username">Username</label>
        <input id="username" v-model="form.username" />

        <label for="name">Name</label>
        <input id="name" v-model="form.name" />

        <label for="role">Role</label>
        <select id="role" v-model="form.role">
          <option value="0">Guest</option>
          <option value="30">Editor</option>
          <option value="60">Administrator</option>
          <option value="90">Owner</option>
        </select>

        <label for="password1">Password</label>
        <input id="password1" type="password" v-model="form.password1" placeholder="********" />

        <label for="password2">Repeat Password</label>
        <input id="password2" type="password" v-model="form.password2" placeholder="********" />

        <label for="createdat">Created</label>
        <input id="createdat" :value="form.createdAt" class="disabled noborder" readonly @focus="selectAll" />

        <label for="changedat">Last Change</label>
        <input id="changedat" :value="form.updatedAt" class="disabled noborder" readonly @focus="selectAll" />

        <p>
          <button @click="submitChanges">Submit changes</button>
        </p>
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

useHead({ title: 'dashboard - users - editing' })

const route = useRoute();
const router = useRouter();

const form = ref({
  _id: '',
  username: '',
  name: '',
  role: 0,
  password1: '',
  password2: '',
  createdAt: '',
  updatedAt: ''
});

const { data: userInfo } = await useFetch(`/api/v1/user/fetch/${route.params.id}`, {});
if (userInfo.value?.user) {
  form.value._id = userInfo.value.user._id;
  form.value.username = userInfo.value.user.username;
  form.value.name = userInfo.value.user.name;
  form.value.role = userInfo.value.user.access_level;
  form.value.createdAt = userInfo.value.user.createdAt;
  form.value.updatedAt = userInfo.value.user.updatedAt;
}

function selectAll(event: FocusEvent) {
  const target = event.target as HTMLInputElement;
  target.select();
}

async function submitChanges() {
  const payload: Record<string, any> = {};

  if (form.value.username) payload.username = form.value.username;
  if (form.value.name) payload.name = form.value.name;
  if (form.value.role !== null) payload.role = form.value.role;
  if (form.value.password1?.trim()) payload.password1 = form.value.password1.trim();
  if (form.value.password2?.trim()) payload.password2 = form.value.password2.trim();

  try {
    await $fetch(`/api/v1/user/modify/${form.value._id}`, {
      method: 'POST',
      body: payload
    });
    router.back();
  } catch (err) {
    console.error(err);
  }
}

async function deleteUser() {
  if (!confirm('Are you sure you want to delete this user?')) return;
  try {
    await $fetch(`/api/v1/user/delete/${form.value._id}`, { method: 'POST' });
    router.back();
  } catch (err) {
    console.error(err);
  }
}
</script>


<style lang="scss" scoped>
.topbar
{
  display: flex;
  align-items: center;
  width: 95%;
  padding: 4px;
  border-bottom: 1px solid rgba(255,255,255,0.1);

  button:not(.danger)
  {
    margin: 0 16px 0 0;
    border: 1px solid transparent;
    border-radius: 12px;
    
    &:hover
    {
      border: 1px solid rgba(255,255,255,0.1);
    }
  }

  button.danger
  {
    margin-left: auto;
    background: transparent;

    &:hover
    {
      border: 1px solid rgba(175, 47, 47, 0.6);
      background: rgba(175, 47, 47, 0.3);
    }
  }
}

.user-editor
{
  width: 95%;
  display: flex;
  margin-top: 24px;

  gap: 24px;

  div.preview
  {
    margin: auto;
  }
  
  div.editing
  {
    flex: 1;
    padding: 16px;
  }
}

.avatar-box
{
  padding: 16px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(0,0,0,0.1);
  cursOr: not-allowed;

  transition: 0.2s;

  &:hover
  {
    background: rgba(0,0,0,0.3);
  }
}
</style>