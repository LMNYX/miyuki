<template>
  <div v-if="!authReady" class="page-loader">
    <p><Icon name="pixelarticons:loader" class="loader-spin" /></p>
  </div>

  <div v-else>
    <div v-if="auth.isLoggedIn">
      <div class="dashboard-wrapper">
        <div class="navigation-bar">
          <DashboardNavButton link="/dashboard" icon="pixelarticons:home" text="overview" />
          <DashboardNavButton link="/dashboard/pages" icon="pixelarticons:file-multiple" text="pages" />
          <DashboardNavButton link="/dashboard/services" icon="pixelarticons:subscriptions" text="services" />
          <DashboardNavButton link="/dashboard/alerts" icon="pixelarticons:modem" text="alerts" />
          <DashboardNavButton link="/dashboard/incidents" icon="pixelarticons:message-delete" text="incidents" />
        </div>
        <slot />
      </div>
    </div>
    <div v-else class="dashboard-login">
      <div class="login-form">
        <p>Dashboard</p>
        <br>
        <div>
          <input v-model="username" placeholder="Username" type="text">
          <input v-model="password" placeholder="Password" type="password">
        </div>
        <br>
        <button :disabled="loading" @click="tryAuthorize">
          {{ loading ? 'Logging in...' : 'Log in' }}
        </button>
        <p v-if="error" style="margin-top:32px;color:#f88; margin-bottom: 0;">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const authReady = ref(false)

const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

onMounted(async () => {
  try {
    const sessionData = await $fetch('/api/v1/user/info')
    auth.setSession(sessionData.session)
  } catch {
    auth.setSession(null)
  } finally {
    authReady.value = true
  }
})

const tryAuthorize = async () => {
  loading.value = true
  error.value = ''

  try {
    const res = await $fetch('/api/v1/user/auth', {
      method: 'POST',
      body: { username: username.value, password: password.value }
    })

    if (res?.success) {
      try {
        const sessionData = await $fetch('/api/v1/user/info')
        auth.setSession(sessionData.session)
      } catch {
        auth.setSession(null)
      }
    } else {
      error.value = 'Login failed'
    }
  } catch (e: any) {
    error.value = e.data?.statusMessage ?? 'Unauthorized'
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.page-loader {
  position: fixed;
  inset: 0;
  background: rgb(20, 20, 20);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.dashboard-login {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .login-form {
    position: absolute;
    padding: 48px;
    width: 300px;
    text-align: center;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
}

.dashboard-wrapper
{
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}

.navigation-bar
{
  height: 100%;
  width: 17em;
  border-right: 1px solid rgba(255,255,255,0.1);
  margin-right: 24px;
}

.loader-spin {
  display: inline-block;
  width: 48px;
  height: 48px;
  animation: spin-oldpc 3s steps(8) infinite;
  transform-origin: center center;
}

@keyframes spin-oldpc {
  100% {
    transform: rotate(360deg);
  }
}

</style>
