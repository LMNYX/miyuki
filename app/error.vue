<template>
  <div class="error">
    <NuxtImg src="/img/sleepy.gif" draggable="false" />
    <div>
        <h1>Oopsie, we've hit {{ error.statusCode }}!</h1>
        <p v-if="error?.statusCode === 404">Be careful next time!</p>
        <p v-else>{{ error?.statusMessage }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { NuxtError } from '#app'

const props = defineProps({
    error: Object as () => NuxtError
})

useHead({
  titleTemplate: `Error`
});
</script>
<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: all 0.11s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.error
{
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    user-select: none;

    img
    {
        margin: 48px;
    }

    h1
    {
        font-size: 48px;
        font-family: 'Tiny5';
    }
}
</style>