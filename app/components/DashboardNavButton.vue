<template>
  <NuxtLink :to="props.link">
    <div class="dashboard-link-content"><Icon :name="props.icon ?? 'pixelarticons:forward'" class="dashboard-icon" /><span class="title">{{ props.text ?? 'Link' }}</span></div>
  </NuxtLink>
</template>

<script lang="ts" setup>
const props = defineProps({
  link: String,
  icon: String,
  text: String
});
</script>

<style lang="scss" scoped>

a
{
  display: block;
  width: 100%;
  padding: 8px 0;
  text-decoration: none;
  border: none;
  text-align: left;
  transition: 0.2s;

  &.router-link-active
  {
    background: rgba(0,0,0,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.1);
    border-top: 1px solid rgba(255,255,255,0.1);
  }

  .dashboard-link-content
  {
    padding: 0 16px;
    transition: 0.2s;
  }

  &:hover
  {
    background: rgba(0,0,0,0.1);
  }
  
  span
  {
    vertical-align: middle;

    &.title
    {
      display: inline-block;
      transform: translateY(-1px);
    }

    &.dashboard-icon
    {
      font-size: 18px;
      margin-right: 8px;
    }
  }
}
</style>