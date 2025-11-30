<template>
  <div>
    <NuxtPage class="main" />
  </div>
</template>

<script lang="ts" setup>
let websiteTitle = "miyuki";

useHead({
  titleTemplate: `${websiteTitle} - %s`
});
</script>
