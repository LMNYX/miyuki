<template>
  <div class="status-monitors">
    <StatusIndicatorStep
      v-for="(entry, index) in normalizedData"
      :key="index"
      :status="mapStatus(entry.status)"
      :tooltip-content="entry.comment"
      :date="formatDate(entry.date)"
    />
  </div>
</template>

<script lang="ts" setup>
import { Status, DayStatusData, mapStatus } from '~/utils/status';

const props = defineProps<{ data: DayStatusData[] }>();

const TOTAL = 60;

const normalizedData = computed(() => {
  const incoming = [...(props.data ?? [])].reverse();
  const result: DayStatusData[] = new Array(TOTAL);
  const start = Math.max(0, TOTAL - incoming.length);

  for (let i = 0; i < TOTAL; i++) {
    if (i < start) {
      const lastDate = incoming.length > 0 ? new Date(incoming[0].date) : new Date();
      const date = new Date(lastDate);
      date.setDate(lastDate.getDate() - (start - i));
      result[i] = {
        date,
        status: Status.UNKNOWN,
        comment: 'No data available'
      };
    } else {
      result[i] = incoming[i - start];
    }
  }

  return result;
});



const formatDate = (d: Date | string) => {
  const date = typeof d === 'string' ? new Date(d) : d;
  return date instanceof Date && !isNaN(date.getTime())
    ? date.toISOString().slice(0,10)
    : '';
};
</script>
