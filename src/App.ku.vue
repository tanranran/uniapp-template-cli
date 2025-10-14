<script lang="ts" setup>
const appData = ref('')

onLaunch(() => {
  console.log('Root onLaunch')
  appData.value = 'App initialized'
})

onLoad(() => {
  console.log('Root onLoad')
})

onShow(() => {
  console.log('Root onShow')
})

onReady(() => {
  console.log('Root onReady')
})
</script>
<template>
  <ku-root-view />
  <global-loading />
  <global-toast />
  <global-message />
  <!-- #ifdef MP-WEIXIN -->
  <privacy-popup />
  <!-- #endif -->
</template>
