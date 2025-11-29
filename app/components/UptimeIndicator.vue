<template>
  <div class="uptime-indicator operational">
    <div class="box" />
    <span class="status tiny-font" :class="status" />
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  status: String
});

</script>