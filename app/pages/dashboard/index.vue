<template>
  <div>
    <div class="dashboard-overview">
      <div class="dashboard-overview1">
        <div class="login-info">
          <div class="content"><p>Welcome back, {{ auth.session?.username }}!</p></div>
        </div>
        <div class="dashboard-card" style="width: 900px">
          <PixelLineChart />
          <div class="dashboard-card--sub-data">
            <div class="dashboard-card--sub-data-section">
              <span class="title">Users</span>
              <span class="value">123 <Icon name="pixelarticons:arrow-up" style="color: lime;" /></span>
            </div>
            <div class="dashboard-card--sub-data-section">
              <span class="title">Something else</span>
              <span class="value">123</span>
            </div>
            <div class="dashboard-card--sub-data-section">
              <span class="title">Another useless</span>
              <span class="value">123</span>
            </div>
          </div>
        </div>
      </div>
      <div class="dashboard-overview2">
        <div class="dashboard-void" />
        <div>
          <h2>Quickstart Guide</h2>
          <div class="quickstart-steps">
            <NuxtLink href="/dashboard/services">
              <Icon name="pixel:code-block" />
              <div>
                <h3>Create a new service</h3>
                <p>Customize health checks, intervals and display of the service</p>
              </div>
            </NuxtLink>
            <NuxtLink href="/dashboard/pages">
              <Icon name="pixel:writing" />
              <div>
                <h3>Create a new page</h3>
                <p>Don't forget to add a CNAME for custom domain!</p>
              </div>
            </NuxtLink>
            <NuxtLink href="/dashboard/alerts">
              <Icon name="pixel:bell-exclaimation" />
              <div>
                <h3>Setup alerts</h3>
                <p>You really do not want to miss when your stuff is down</p>
              </div>
            </NuxtLink>
            <NuxtLink href="/dashboard/incidents">
              <Icon name="pixel:newspaper" />
              <div>
                <h3>Alert users about incidents</h3>
                <p>For when you want to explain what went wrong</p>
              </div>
            </NuxtLink>
            <NuxtLink href="https://github.com/LMNYX/miyuki">
              <Icon name="pixel:github" />
              <div>
                <h3>Star Miyuki on GitHub</h3>
                <p>If you enjoy using it</p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  middleware: ['require-auth'],
  accessLevel: 0,
  layout: 'dashboard',
})
useHead({ title: "dashboard" });

const auth = useAuthStore()
</script>

<style lang="scss" scoped>
.login-info
{
  width: 100%;
  padding: 12px 0;
  margin: 16px 0;

  .content
  {
    padding: 0 24px;
  }
}

.dashboard-void
{
  height: 80px;
  margin: 16px 0;
}

.dashboard-card
{
  border: 1px solid rgba(255,255,255, 0.1);
  padding: 24px;
  border-radius: 16px;
  width: 100%;

  &--sub-data
  {
    padding: 12px;
    display: flex;
    gap: 8px;

    &-section
    {
      display: flex;
      flex-direction: column;
      flex: 1;

      span.title
      {
        font-size: 18px;
        font-family: 'Tiny5';
        font-smooth: never;
        -webkit-font-smoothing : none;
      }
    }
  }
}
.dashboard-overview {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  height: 100vh;
}

.dashboard-overview1, 
.dashboard-overview2 {
  height: 100%;
}

.quickstart-steps
{
  display: flex;
  flex-direction: column;

  gap: 8px;

  a
  {
    text-decoration: none;
    padding: 24px 32px;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    max-width: 600px;
    transition: 0.2s;
    will-change: background;
    display: flex;
    flex-direction: row;
    align-items: center;
    &:hover
    {
      background: rgba(0,0,0,0.2);
    }

    span.iconify
    {
      font-size: 48px;
      margin: 12px;
    }

    h3, p
    {
      padding: 0;
      margin: 0;
    }
  }
}


</style>
