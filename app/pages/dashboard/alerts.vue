<template>
  <div>
    <p>Alerts</p>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: 'dashboard'
})
useHead({ title: "dashboard - alerts" });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const auth = useAuthStore()
</script>

<style lang="scss" scoped>

</style>
