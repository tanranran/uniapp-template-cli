<script lang="ts" setup>
definePage({
  style: {
    navigationBarTitleText: '我是testB'
  }
})
const loading = useGlobalLoading()
</script>

<template>
  <wd-button @click="loading.show()">测试loading</wd-button>
</template>
