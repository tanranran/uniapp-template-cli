<script lang="ts" setup>
const { themeVars, theme } = useManualTheme()
onLaunch(() => {
  console.log('Root onLaunch')
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
  <!--  <wd-config-provider :theme="theme" :theme-vars="themeVars">-->
  <ku-root-view />
  <global-loading />
  <global-toast />
  <global-message />
  <!-- #ifdef MP-WEIXIN -->
  <privacy-popup />
  <!-- #endif -->
  <!--  </wd-config-provider>-->
</template>
