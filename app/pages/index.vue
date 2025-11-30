<template>
  <div>
    <div class="status-page">
      <div class="header">
        <div class="status-title">
          <h1>{{ pageTitle }}</h1>
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
import { Status, DayStatusData } from '~/utils/status';
import { generateRandomTestData } from '~/utils/testData';
const {data: versionData} = await useFetch('/api/version');

let { filter } = useRoute().query;
console.log(filter);
console.log(versionData);

useHead({
  title: "status"
});

let pageTitle: String = "Status page";
let overallUptime: Number = 0.938464;
let testUptime: Number = 0.9933449;

const testData = [
  {
    date: new Date("2025-10-10"),
    status: Status.OPERATIONAL,
    comment: "All systems operational"
  },
  {
    date: new Date("2025-10-09"),
    status: Status.PARTIALLY_OUT,
    comment: "Partial outage in region <a href='/#222'>#222</a>"
  },
  {
    date: new Date("2025-10-08"),
    status: Status.COMPLETELY_OUT,
    comment: "Major service disruption"
  },
  {
    date: new Date("2025-10-07"),
    status: Status.OPERATIONAL,
    comment: "Recovered"
  },
  {
    date: new Date("2025-10-06"),
    status: Status.COMPLETELY_OUT,
    comment: "All systems operational"
  }
];




</script>
