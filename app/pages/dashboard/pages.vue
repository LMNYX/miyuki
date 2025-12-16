<template>
  <div>
    <p>Pages</p>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  middleware: ['require-auth'],
  accessLevel: 60,
  layout: 'dashboard'
})
useHead({ title: "dashboard - pages" });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const auth = useAuthStore()
</script>

<style lang="scss" scoped>

</style>
