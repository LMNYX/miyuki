<template>
  <TooltipProvider>
    <TooltipRoot>
      <TooltipTrigger as-child>
        <Avatar :name="props.name" variant="beam" />
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent class="TooltipContent">
            <p>{{ tooltipContent }}</p>
          <TooltipArrow class="TooltipArrow" />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>

<script lang="ts" setup>
import Avatar from 'vue-boring-avatars';

const props = defineProps(['name', 'tooltipContent']);
</script>