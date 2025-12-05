<template>
  <div>
    <div class="error" v-if="isMaintenance">
      <NuxtImg src="/img/sleepy.gif" draggable="false" />
      <div>
          <h1>Oopsie, we're on a maintenance!</h1>
          <p v-if="maintenanceMessage != ''">{{ maintenanceMessage}}</p>
          <p v-else>There was no message provided, but we'll be back soon!</p>
      </div>
  </div>
  <NuxtLayout v-else>
    <NuxtPage class="page" :configuration="configuration" />
  </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'

const {data: configuration} = await useFetch('/api/v1/config');
const config: any = configuration;
useHead({
  titleTemplate: `${config.value['site.name']} - %s`
});

const { isMaintenance, maintenanceMessage } = isMaintenanceEnabled();

function isMaintenanceEnabled() {
  return {
    isMaintenance: config['maintenance.enabled'] ?? false,
    maintenanceMessage: config['maintenance.message'] ?? ''
  };
}


const auth = useAuthStore()

async function preloadAuth() {
  try {
    const data = await $fetch('/api/v1/user/info')
    auth.setSession(data.session)
  } catch {
    auth.setSession(null)
  }
}

onMounted(() => {
  preloadAuth()

  // polling?... idk, probably worth removing
  const interval = setInterval(preloadAuth, 30000)
  onUnmounted(() => clearInterval(interval))
})

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