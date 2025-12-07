<script lang="ts" setup>
import PrivacyPopup from '@/components/business/PrivacyPopup.vue'
import { uuid } from '@/utils/uuid.ts'

definePage({
  type: 'home',
  style: {
    navigationBarTitleText: '我是首页'
  }
})

function onGenerateUUID() {
  const u = uuid()
  console.log('uuid:', u)
}

function textHttp() {
  Apis.http.post('/harmony/index/json', {}, {}).then((res) => {
    if (res.isOK(true, true)) {
      console.log(res.data)
    }
  })
  setTimeout(() => {
    Apis.http.post('/harmony/index/json').then((res) => {
      if (res.isOK(true, true)) {
        console.log(res.data)
      }
    })
  }, 30)
}
</script>

<template>
  <base-layout>
    <view class="h-full w-full">
      <wd-cell-group border custom-class="rounded-2! overflow-hidden">
        <wd-cell is-link title="下拉刷新框架" @click="router.push('/pages/index/paging')" />
        <wd-cell is-link title="Unocss 原子化" @click="router.push('/pages-sub/styles/index')" />
        <wd-cell is-link title="测试页面A" @click="router.push('/pages/index/testA')" />
        <wd-cell is-link title="测试网络请求" @click="textHttp()" />
        <!--    <wd-cell is-link title="uni-echarts" @click="router.push('/subEcharts/echarts/index')" /> -->
        <!--    <wd-cell is-link title="uni-echarts-async" @click="router.push('/subAsyncEcharts/asyncEcharts/index')" /> -->
      </wd-cell-group>
      <text class="bg-242629-E0E0E0">车费是数据1</text>
    </view>
    <PrivacyPopup />
  </base-layout>
</template>
