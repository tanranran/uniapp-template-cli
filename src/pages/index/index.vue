<script lang="ts" setup>
import type { DateMark } from '@/components/common/Calendar.vue'
import PrivacyPopup from '@/components/business/PrivacyPopup.vue'
import Calendar from '@/components/common/Calendar.vue'
import { uuid } from '@/utils/uuid'

definePage({
  type: 'home',
  style: {
    navigationBarTitleText: '日历组件测试'
  }
})

function onGenerateUUID() {
  const u = uuid()
  console.log('uuid:', u)
}

function textHttp() {
  Apis.http.post('/harmony/index/json', {}, {}).then((res: any) => {
    if (res.isOK(true, true)) {
      console.log(res.data)
    }
  })
  setTimeout(() => {
    Apis.http.post('/harmony/index/json').then((res: any) => {
      if (res.isOK(true, true)) {
        console.log(res.data)
      }
    })
  }, 30)
}

// 测试数据：日期标记
const dateMarks: DateMark[] = [
  {
    date: '2025-06-03',
    type: 'income' as const,
    amount: '4004',
    title: '闪货贷'
  },
  {
    date: '2025-06-08',
    type: 'recharge' as const,
    amount: '1580',
    title: '信用卡'
  },
  {
    date: '2025-06-15',
    type: 'expense' as const,
    amount: '3835',
    title: '分期乐'
  },
  {
    date: '2025-06-17',
    type: 'income' as const,
    amount: '2429',
    title: '分期乐'
  },
  {
    date: '2025-06-20',
    type: 'expense' as const,
    amount: '2000',
    title: '平安普惠'
  },
  {
    date: '2025-06-26',
    type: 'recharge' as const,
    amount: '15221',
    title: '买单侠'
  }
]

// 事件处理函数
function handleViewChange(view: string) {
  console.log('视图切换:', view)
}

function handleDateChange(date: string) {
  console.log('日期变化:', date)
}

function handleDateClick(date: string, mark?: any) {
  console.log('点击日期:', date, '标记:', mark)
}
</script>

<template>
  <base-layout>
    <view class="h-full w-full p-4">
      <wd-cell-group border custom-class="rounded-2! overflow-hidden mb-4">
        <wd-cell is-link title="下拉刷新框架" @click="router.push('/pages/index/paging')" />
        <wd-cell is-link title="Unocss 原子化" @click="router.push('/pages-sub/styles/index')" />
        <wd-cell is-link title="测试页面A" @click="router.push('/pages/index/testA')" />
        <wd-cell is-link title="测试页面B" @click="router.push('/pages/index/testB')" />
        <wd-cell is-link title="测试网络请求" @click="textHttp()" />
        <!--    <wd-cell is-link title="uni-echarts" @click="router.push('/subEcharts/echarts/index')" /> -->
        <!--    <wd-cell is-link title="uni-echarts-async" @click="router.push('/subAsyncEcharts/asyncEcharts/index')" /> -->
      </wd-cell-group>

      <!-- 日历组件测试 -->
      <view class="mb-4">
        <text class="mb-2 block text-lg font-bold">日历组件测试</text>
        <Calendar :date-marks="dateMarks" @view-change="handleViewChange" @date-change="handleDateChange" @date-click="handleDateClick" />
      </view>

      <text class="bg-242629-E0E0E0">车费是数据1</text>
    </view>
    <PrivacyPopup />
  </base-layout>
</template>
