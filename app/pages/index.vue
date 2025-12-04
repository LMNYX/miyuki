<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <div class="status-page">
      <div class="header">
        <div class="status-title">
          <h1>{{ pageInfo.title }}</h1>
          <UptimeIndicator status="operational" />
        </div>
        <div class="status-info">
          <h1 class="tiny-font">{{ (overallUptime * 100).toFixed(2) }}%</h1>
          <p>overall uptime</p>
        </div>
      </div>
      <div class="statuses">
        <div v-if="pageInfo.groups.length < 1"><p>There is no services yet! :(</p></div>
        <StatusGroup v-for="statusGroup in pageInfo.groups" :key="statusGroup.slug" :title="statusGroup.displayName">
          <StatusBox
          v-for="service in statusGroup.services"
          :key="service.slug"
          :slug="service.slug"
          :title="service.displayName"
          :status="Status.OPERATIONAL"
          :uptime="testUptime"
          :data="[...generateRandomTestData()]" />
        </StatusGroup>
      </div>
      <!-- footer -->
      <div class="footer">
        <div v-if="!props.configuration['site.hide_miyuki']"><span>powered by <a href="https://github.com/LMNYX/miyuki">miyuki</a> v{{ versionData?.version }}</span></div>
        <div v-if="props.configuration['site.footer'] != '' && !pageInfo.footerOverride" v-html="props.configuration['site.footer']" />
        <div v-if="pageInfo.footerOverride" v-html="pageInfo.footerOverride" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Status } from '~/utils/status';
import { generateRandomTestData } from '~/utils/testData';
const appConfig = useAppConfig() 

// eslint-disable-next-line vue/require-prop-types
const props = defineProps(['configuration']);

const {data: versionData} = await useFetch('/api/version');

let hostname = useRequestURL().hostname;

const {data: pageInfo} = await useFetch('/api/v1/page/', {
  query: {
    cname: hostname
  }
});

useHead({
  titleTemplate: `${pageInfo.value.name} - %s`,
  title: "status"
});

let overallUptime = 0.938464;
let testUptime = 0.9933449;

</script>
