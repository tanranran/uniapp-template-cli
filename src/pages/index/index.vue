<script lang="ts" setup>
  import { uuid } from '@/utils/uuid.ts'
  import PrivacyPopup from '@/components/PrivacyPopup.vue'
  definePage({
    type: 'home',
    style: {
      navigationBarTitleText: '我是首页'
    }
  })

  function onGenerateUUID() {
    let u = uuid()
    console.log('uuid:', u)
  }
</script>
<template>
  <base-layout>
    <view class="w-full h-full">
      <wd-cell-group border custom-class="rounded-2! overflow-hidden">
        <wd-cell is-link title="下拉刷新框架" @click="router.push('/pages/index/paging')" />
        <wd-cell is-link title="Unocss 原子化" @click="router.push('/pages-sub/styles/index')" />
        <wd-cell is-link title="测试页面A" @click="router.push('/pages/index/testA')" />
        <!--    <wd-cell is-link title="uni-echarts" @click="router.push('/subEcharts/echarts/index')" />-->
        <!--    <wd-cell is-link title="uni-echarts-async" @click="router.push('/subAsyncEcharts/asyncEcharts/index')" />-->
      </wd-cell-group>

      <text class="bg-242629-E0E0E0">车费是数据1</text>
    </view>
    <PrivacyPopup />
  </base-layout>
</template>
