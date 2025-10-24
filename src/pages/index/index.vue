<script lang="ts" setup>
definePage({
  style: {
    navigationBarTitleText: '我是首页'
  }
})
const { theme, toggleTheme } = useManualTheme()
const isDark = computed({
  get() {
    return theme.value === 'dark'
  },
  set() {
    toggleTheme()
  }
})
</script>
<template>
  <view class="w-full h-full">
    <wd-cell-group border custom-class="rounded-2! overflow-hidden">
      <wd-cell is-link title="下拉刷新框架" @click="router.push('/pages/index/paging')" />
      <wd-cell is-link title="Unocss 原子化" @click="router.push('/pages-sub/styles/index')" />
      <wd-cell is-link title="测试页面A" @click="router.push('/pages/index/testA')" />

      <wd-cell is-link title="设置主题变量" @click="router.push('/pages/index/testA')" />
      <wd-cell title="暗黑模式">
        <wd-switch v-model="isDark" size="18rpx" />
      </wd-cell>
      <!--    <wd-cell is-link title="uni-echarts" @click="router.push('/subEcharts/echarts/index')" />-->
      <!--    <wd-cell is-link title="uni-echarts-async" @click="router.push('/subAsyncEcharts/asyncEcharts/index')" />-->
    </wd-cell-group>
  </view>
</template>
