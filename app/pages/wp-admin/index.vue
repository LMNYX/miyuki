<template>
  <div class="error">
    <NuxtImg src="/img/bot.gif" draggable="false" />
    <div>
        <h1>We gave you 200!</h1>
        <p>Just so that you think that we use WordPress!</p>
    </div>
  </div>
</template>

<script lang="ts" setup>

let websiteTitle = "miyuki";

useHead({
  title: 'You asked for wp-admin and you got it!'
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