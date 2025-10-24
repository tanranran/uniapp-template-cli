<template>
  <wd-button
    @click="
      ui.showToast({
        msg: '测试Toast'
      })
    "></wd-button>
</template>

<script lang="ts" setup>
definePage({
  style: {
    navigationBarTitleText: '我是testA'
  }
})
</script>

<style></style>
