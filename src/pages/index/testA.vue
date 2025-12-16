<script lang="ts" setup>
import BarChart from '@/pages-sub/components/BarChart.vue?async'

definePage({
  style: {
    navigationBarTitleText: '我是testA'
  }
})
</script>

<template>
  <base-layout>
    <wd-button
      @click="
        ui.showToast({
          msg: '测试Toast'
        })
      "
    />

    <BarChart text="我是异步组件" />
  </base-layout>
</template>
