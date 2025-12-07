<script lang="ts" setup>
const { theme, isDark, themeVars } = useTheme()
onLaunch(() => {
  // console.log('Root onLaunch')
})

onLoad(() => {
  // console.log('Root onLoad')
})

onShow(() => {
  // console.log('Root onShow')
})

onReady(() => {
  // console.log('Root onReady')
})
</script>

<template>
  <wd-config-provider :custom-class="`page-wrapper ${theme}`" :theme="theme" :theme-vars="themeVars">
    <ku-root-view />
    <global-loading />
    <global-toast />
    <global-message />
    <!-- #ifdef MP-WEIXIN -->
    <privacy-popup />
    <!-- #endif -->
  </wd-config-provider>
</template>
