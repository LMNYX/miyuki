<template>
  <div class="status-group">
    <h2 @click="toggleDisplay">{{ props.title }}</h2>
    <transition name="fade">
      <div v-if="shown" class="collapsible-content">
        <slot />
      </div>
      <div v-else class="collapsed-data" @click="toggleDisplay"><span>Collapsed, but still</span> <UptimeIndicator status="operational" /><span>!</span></div>
    </transition>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  title: String
});

let shown = ref(true);

function toggleDisplay() {
  shown.value = !shown.value;
}

</script>

<style lang="scss" scoped>
.collapsed-data
{
  user-select: none;
  vertical-align: middle;
  transition: 0.2s;


  * {
    vertical-align: middle;
  }
}

.collapsible-content
{
  transition: 0.2s;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .2s
}

.fade-enter,
.fade-leave-to {
    opacity: 0
}
</style>