<template>
  <div>
    <div class="topbar">
      <button @click="$router.back()"><Icon name="pixelarticons:chevron-left" /></button>
      <p>Create a new user</p>
    </div>
    <div class="user-editor">
      <div class="editing">
        <label for="username">Username</label>
        <input id="username" v-model="form.username" placeholder="smartfella" />

        <label for="name">Name</label>
        <input id="name" v-model="form.name" placeholder="Fart Smella" />

        <label for="role">Role</label>
        <select id="role" v-model="form.role">
          <option value="0" selected>Guest</option>
          <option value="30">Editor</option>
          <option value="60">Administrator</option>
          <option value="90">Owner</option>
        </select>

        <label for="password1">Password</label>
        <input id="password1" type="password" v-model="form.password1" placeholder="********" />

        <label for="password2">Repeat Password</label>
        <input id="password2" type="password" v-model="form.password2" placeholder="********" />
        <p><Button @click="submitNewUser" :disabled="isProcessing">Create new user</Button></p>
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

useHead({ title: 'dashboard - users - create' })

const route = useRoute();
const router = useRouter();

const errorMessage = ref('');
const isProcessing = ref(false);
const form = ref({
  username: '',
  name: '',
  role: 0,
  password1: '',
  password2: ''
});

async function submitNewUser() {
  isProcessing.value = true;
  const payload: Record<string, any> = {};
  if (form.value.username) payload.username = form.value.username;
  if (form.value.name) payload.name = form.value.name;
  if (form.value.role !== null) payload.role = form.value.role;
  if (form.value.password1?.trim()) payload.password1 = form.value.password1.trim();
  if (form.value.password2?.trim()) payload.password2 = form.value.password2.trim();
  try {
    await $fetch(`/api/v1/user/create`, {
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

.error-text
{
  color: rgb(202, 57, 57);
}
</style>