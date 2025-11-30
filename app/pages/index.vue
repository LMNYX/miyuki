<template>
  <div>
    <div class="status-page">
      <div class="header">
        <div class="status-title">
          <h1>Status page</h1>
          <UptimeIndicator status="partially-out" />
        </div>
        <div class="status-info">
          <h1 class="tiny-font">99.99%</h1>
          <p>overall uptime</p>
        </div>
      </div>
      <div class="statuses">
        
        <StatusGroup title="🇵🇱 Poland">
          <StatusBox title="Email" :uptime="testUptime" :status="Status.OPERATIONAL" :data="testData" />
          <StatusBox title="VPN" :uptime="testUptime" :status="Status.PARTIALLY_OUT" :data="testData" />
        </StatusGroup>

        <StatusGroup title="🇷🇴 Romania">
          <StatusBox title="VPN" :uptime="testUptime" :status="Status.PARTIALLY_OUT" :data="testData" />
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
const {data: versionData} = await useFetch('/api/version');

console.log(versionData);

useHead({
  title: "status"
});

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
    status: Status.OPERATIONAL,
    comment: "All systems operational"
  }
];


</script>
