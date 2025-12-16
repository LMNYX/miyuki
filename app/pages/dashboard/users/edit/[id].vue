<template>
  <div>
    <div class="topbar">
      <button @click="$router.back()"><Icon name="pixelarticons:chevron-left" /></button>
      <p>Editing {{ userInfo.user.name }}</p>
      <button class="danger">Delete user</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()

definePageMeta({
  middleware: ['require-auth'],
  accessLevel: 90,
  layout: 'dashboard'
})

const {data: userInfo} = await useFetch(`/api/v1/user/fetch/${route.params.id}`, {
});

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
</style>