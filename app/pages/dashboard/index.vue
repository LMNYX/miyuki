<template>
  <div>
    <p>Logged in as {{ auth.session?.username }}</p>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: 'dashboard'
})
useHead({ title: "dashboard" });

const auth = useAuthStore()
</script>

<style lang="scss" scoped>

</style>
