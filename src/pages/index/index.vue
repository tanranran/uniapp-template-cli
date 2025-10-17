<script lang="ts" setup>
definePage({
  style: {
    navigationBarTitleText: '我是首页'
  }
})
</script>
<template>
  <wd-cell-group border custom-class="rounded-2! overflow-hidden">
    <wd-cell is-link title="下拉刷新框架" @click="router.push('/pages/index/paging')" />
    <wd-cell is-link title="Unocss 原子化" @click="router.push('/subPages/styles/index')" />
    <wd-cell is-link title="uni-echarts" @click="router.push('/subEcharts/echarts/index')" />
    <wd-cell is-link title="uni-echarts-async" @click="router.push('/subAsyncEcharts/asyncEcharts/index')" />
  </wd-cell-group>
</template>
