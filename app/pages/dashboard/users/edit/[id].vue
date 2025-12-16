<template>
  <div>
    <div class="topbar">
      <button @click="$router.back()"><Icon name="pixelarticons:chevron-left" /></button>
      <p>Editing {{ userInfo.user.name }}</p>
      <button class="danger">Delete user</button>
    </div>
    <div class="user-editor">
      <div class="preview">
        <div class="avatar-box"><Avatar :size="200" :name="userInfo.user._id" variant="beam" /></div>
      </div>
      <div class="editing">
        <label for="username">Username</label>
        <input id="username" :value="userInfo.user.username">
        <label for="name">Name</label>
        <input id="name" :value="userInfo.user.name">
        <label for="role">Role</label>
        <select id="role">
          <option value="0" :selected="userInfo.user.access_level < 30">Guest</option>
          <option value="30" :selected="userInfo.user.access_level >= 30 && userInfo.user.access_level < 60">Editor</option>
          <option value="60" :selected="userInfo.user.access_level >= 60 && userInfo.user.access_level < 90">Administrator</option>
          <option value="90" :selected="userInfo.user.access_level >= 90">Superadministrator</option>
        </select>
        <label for="password">Password</label>
        <input id="password" type="password" placeholder="********">
        <label for="password2">Repeat Password</label>
        <input id="password2" type="password" placeholder="********">
        <p><button>Submit changes</button></p>
      </div>
      <div class="editing" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Avatar from 'vue-boring-avatars';

const route = useRoute()

definePageMeta({
  middleware: ['require-auth'],
  accessLevel: 90,
  layout: 'dashboard'
})

useHead({
  title: `users - editing`
})

const {data: userInfo} = await useFetch(`/api/v1/user/fetch/${route.params.id}`, {});

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