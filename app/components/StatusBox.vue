<template>
  <div class="status-box">
    <div class="header">
      <div class="title">
        <span>{{ props.title }}</span> <span class="tiny-font server-uptime-info">{{ (props.uptime as number * 100).toFixed(2) }}% uptime</span>
      </div>
      <div class="status">
        <UptimeIndicator :status="mapStatus(props.status)" />
      </div>
    </div>
    <StatusIndicatorGroup :data="data" />
  </div>
</template>

<script lang="ts" setup>
/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import type { Status, DayStatusData, mapStatus } from '~/utils/status';

const props = defineProps<{ data: DayStatusData[], uptime: Number, title: String, status: Status }>();
</script>

<style lang="scss" scoped>

</style>