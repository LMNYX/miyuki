<template>
  <div>
    <NuxtPage class="page" />
  </div>
</template>

<script lang="ts" setup>
let websiteTitle = "miyuki";

useHead({
  titleTemplate: `${websiteTitle} - %s`
});
</script>
<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: all 0.21s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>