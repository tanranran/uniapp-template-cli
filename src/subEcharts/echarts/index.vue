<script lang="ts" setup>
// import BarChart from './components/BarChart.vue'
// import DonutChart from './components/DonutChart.vue'
// import FunnelChart from './components/FunnelChart.vue'
// import GaugeChart from './components/GaugeChart.vue'
// import LineChart from './components/LineChart.vue'
// import LiquidFillChart from './components/LiquidFillChart.vue'
// import MiniLineChart from './components/MiniLineChart.vue'
// import PieChart from './components/PieChart.vue'
// import RadarChart from './components/RadarChart.vue'
// import ScatterChart from './components/ScatterChart.vue'
// import StackedBarChart from './components/StackedBarChart.vue'

definePage({
  style: {
    navigationBarTitleText: 'Echarts 演示'
  }
})

function navigateToAsync() {
  // router.push('/subAsyncEcharts/asyncEcharts/index')
}
</script>

<template>
  <view class="bg-gray-50 p-5">
    <!-- 异步 Echarts 入口 -->
    <view class="mb-5 rounded-3 bg-white p-3 shadow-sm">
      <view class="rounded-2 bg-blue-500 px-6 py-3 text-white font-medium transition-colors hover:bg-blue-600" @click="navigateToAsync">查看异步 Echarts 示例</view>
    </view>
    <!-- 饼图 -->
    <view class="mb-5 rounded-3 bg-white p-5 shadow-sm">
      <view class="mb-5 text-center text-base text-gray-800 font-medium">饼图示例</view>
      <PieChart />
    </view>

    <!--    &lt;!&ndash; 柱状图 &ndash;&gt;-->
    <!--    <view class="mb-5 rounded-3 bg-white p-5 shadow-sm">-->
    <!--      <view class="mb-5 text-center text-base text-gray-800 font-medium">柱状图示例</view>-->
    <!--      <BarChart />-->
    <!--    </view>-->

    <!--    &lt;!&ndash; 折线图 &ndash;&gt;-->
    <!--    <view class="mb-5 rounded-3 bg-white p-5 shadow-sm">-->
    <!--      <view class="mb-5 text-center text-base text-gray-800 font-medium">折线图示例</view>-->
    <!--      <LineChart />-->
    <!--    </view>-->

    <!--    &lt;!&ndash; 雷达图 &ndash;&gt;-->
    <!--    <view class="mb-5 rounded-3 bg-white p-5 shadow-sm">-->
    <!--      <view class="mb-5 text-center text-base text-gray-800 font-medium">雷达图示例</view>-->
    <!--      <RadarChart />-->
    <!--    </view>-->

    <!--    &lt;!&ndash; 散点图 &ndash;&gt;-->
    <!--    <view class="mb-5 rounded-3 bg-white p-5 shadow-sm">-->
    <!--      <view class="mb-5 text-center text-base text-gray-800 font-medium">散点图示例</view>-->
    <!--      <ScatterChart />-->
    <!--    </view>-->

    <!--    &lt;!&ndash; 环形图 &ndash;&gt;-->
    <!--    <view class="mb-5 rounded-3 bg-white p-5 shadow-sm">-->
    <!--      <view class="mb-5 text-center text-base text-gray-800 font-medium">环形图示例</view>-->
    <!--      <DonutChart />-->
    <!--    </view>-->

    <!--    &lt;!&ndash; 漏斗图 &ndash;&gt;-->
    <!--    <view class="mb-5 rounded-3 bg-white p-5 shadow-sm">-->
    <!--      <view class="mb-5 text-center text-base text-gray-800 font-medium">漏斗图示例</view>-->
    <!--      <FunnelChart />-->
    <!--    </view>-->

    <!--    &lt;!&ndash; 仪表盘图 &ndash;&gt;-->
    <!--    <view class="mb-5 rounded-3 bg-white p-5 shadow-sm">-->
    <!--      <view class="mb-5 text-center text-base text-gray-800 font-medium">仪表盘示例</view>-->
    <!--      <GaugeChart />-->
    <!--    </view>-->

    <!--    &lt;!&ndash; 迷你折线图 &ndash;&gt;-->
    <!--    <view class="mb-5 rounded-3 bg-white p-5 shadow-sm">-->
    <!--      <view class="mb-5 text-center text-base text-gray-800 font-medium">迷你折线图示例</view>-->
    <!--      <MiniLineChart />-->
    <!--    </view>-->

    <!--    &lt;!&ndash; 堆叠柱状图 &ndash;&gt;-->
    <!--    <view class="mb-5 rounded-3 bg-white p-5 shadow-sm">-->
    <!--      <view class="mb-5 text-center text-base text-gray-800 font-medium">堆叠柱状图示例</view>-->
    <!--      <StackedBarChart />-->
    <!--    </view>-->

    <!--    &lt;!&ndash; 水球图 &ndash;&gt;-->
    <!--    <view class="mb-5 rounded-3 bg-white p-5 shadow-sm">-->
    <!--      <view class="mb-5 text-center text-base text-gray-800 font-medium">水球图示例</view>-->
    <!--      <LiquidFillChart />-->
    <!--    </view>-->
  </view>
</template>
