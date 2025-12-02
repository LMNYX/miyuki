<template>
  <div class="status-group">
    <h2 class="status-title" @click="toggleDisplay">{{ props.title }}</h2>
    <transition name="fade">
      <div v-if="shown" class="collapsible-content">
        <slot />
      </div>
      <div v-else class="collapsed-data" @click="toggleDisplay"><span>You've hidden this group, but it seems that it's</span> <UptimeIndicator status="operational" /><span>!</span></div>
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

.status-title
{
  position: relative;
  transition: 0.2s;
  &:hover
  {
    transform: translateX(8px);
  }
}

.collapsible-content
{
  transition: 0.2s;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.21s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.5);
  filter: blur(2rem);
  height: 0;
}
</style>