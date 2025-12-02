<template>
  <TooltipProvider>
    <TooltipRoot>
      <TooltipTrigger as="div" class="monitor" :class="[props.status ?? 'unknown', { glow: props.isGlowing }]">
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent class="TooltipContent">
          <div class="centered">
            <span class="tiny-font date-display">{{ props.date?.toString() }}</span>
            <span v-html="props.tooltipContent ?? 'No data'"></span>
          </div>
          <TooltipArrow class="TooltipArrow" />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>

<script lang="ts" setup>
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger } from 'reka-ui'

const props = defineProps({
  date: String,
  tooltipContent: String,
  status: String,
  isGlowing: Boolean
})

</script>
<style lang="scss" scoped>
.centered
{
  text-align: center;

  span.date-display
  {
    display: block;
    margin-bottom: 4px;
  }
}
</style>