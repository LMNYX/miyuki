<template>
  <div>
    <div class="status-page">
      <div class="header">
        <div class="status-title">
          <h1>Status page</h1>
          <UptimeIndicator status="partially-out" />
        </div>
        <div class="status-info">
          <h1 class="tiny-font">{{ (overallUptime * 100).toFixed(2) }}%</h1>
          <p>overall uptime</p>
        </div>
      </div>
      <div class="statuses">
        
        <StatusGroup title="🇵🇱 Poland">
          <StatusBox title="Email" :uptime="testUptime" :status="Status.OPERATIONAL" slug="pl-email" :data="[...generateRandomTestData()]" />
          <StatusBox title="VPN" :uptime="testUptime" :status="Status.PARTIALLY_OUT" slug="pl-vpn" :data="[...generateRandomTestData()]" />
        </StatusGroup>

        <StatusGroup title="🇷🇴 Romania">
          <StatusBox title="VPN" :uptime="testUptime" :status="Status.PARTIALLY_OUT" slug="ro-vpn" :data="[...generateRandomTestData()]" />
        </StatusGroup>

        <StatusGroup title="🇸🇪 Sweden">
          <StatusBox title="uwu.so" :uptime="testUptime" :status="Status.OPERATIONAL" slug="uwu-so" :data="[...generateRandomTestData()]" />
          <StatusBox title="thighs.moe" :uptime="testUptime" :status="Status.COMPLETELY_OUT" slug="thighs-moe" :data="[...generateRandomTestData()]" />
          <StatusBox title="mishashto.com" :uptime="testUptime" :status="Status.OPERATIONAL" slug="mishashto-com" :data="[...generateRandomTestData()]" />
        </StatusGroup>
      </div>
      <!-- footer -->
      <div class="footer">
        <div><span>powered by <a href="https://github.com/LMNYX/miyuki">miyuki</a> v{{ versionData?.version }}</span></div>
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

console.log(props.configuration);
const {data: versionData} = await useFetch('/api/version');

let hostname = useRequestURL().hostname;
console.log(`GETTING DATA FOR ${hostname} ${appConfig.defaultDomain == hostname ? '(default)' : ''}`);

useHead({
  title: "status"
});

let overallUptime = 0.938464;
let testUptime = 0.9933449;

</script>
