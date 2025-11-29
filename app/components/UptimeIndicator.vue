<template>
  <div class="uptime-indicator" :class="props.status">
    <div class="box" />
    <span class="status tiny-font" />
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  status: String
});

</script>