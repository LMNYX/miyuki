<template>
  <div>
    <p>Services</p>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: 'dashboard'
})
useHead({ title: "dashboard - services" });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const auth = useAuthStore()
</script>

<style lang="scss" scoped>

</style>
