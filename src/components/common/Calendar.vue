<script setup lang="ts">
// Vue imports
import type { ComputedRef } from 'vue'
import { computed, onMounted, ref } from 'vue'
import { useTheme } from '@/composables/useTheme'

// 定义视图类型
type ViewType = 'day' | 'month' | 'year'

// 定义日期标记类型
export interface DateMark {
  date: string
  type: 'income' | 'expense' | 'recharge' | 'other'
  amount?: string
  title?: string
}

// 设置默认属性
const props = defineProps<{
  view?: ViewType
  currentDate?: string
  dateMarks?: DateMark[]
}>()

// 组件事件
const emit = defineEmits<{
  (e: 'viewChange', view: ViewType): void
  (e: 'dateChange', date: string): void
  (e: 'dateClick', date: string, mark?: DateMark | undefined): void
}>()

// 为props.dateMarks提供默认值
const safeDateMarks: ComputedRef<DateMark[]> = computed(() => props.dateMarks ?? [])

// 主题
const { theme } = useTheme()

// 内部状态
const currentView = ref<ViewType>(props.view ?? 'day')
const currentDate = ref(new Date(props.currentDate ?? Date.now()))

// 计算当前月份的第一天是星期几
const firstDayOfMonth = computed(() => {
  const firstDay = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), 1)
  return firstDay.getDay()
})

// 计算当前月份的天数
const daysInMonth = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  return new Date(year, month + 1, 0).getDate()
})

// 生成日历数据
const calendarData = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const days = []

  // 添加上个月的日期
  for (let i = firstDayOfMonth.value - 1; i >= 0; i--) {
    const date = new Date(year, month, 0 - i)
    days.push({
      date,
      isCurrentMonth: false,
      isToday: isToday(date),
      day: date.getDate()
    })
  }

  // 添加当前月的日期
  for (let i = 1; i <= daysInMonth.value; i++) {
    const date = new Date(year, month, i)
    days.push({
      date,
      isCurrentMonth: true,
      isToday: isToday(date),
      day: date.getDate()
    })
  }

  // 补全到6行7列
  const totalDays = Math.ceil(days.length / 7) * 7
  for (let i = days.length; i < totalDays; i++) {
    const date = new Date(year, month + 1, i - daysInMonth.value - firstDayOfMonth.value + 1)
    days.push({
      date,
      isCurrentMonth: false,
      isToday: isToday(date),
      day: date.getDate()
    })
  }

  return days
})

// 生成月份数据
const monthData = computed(() => {
  const year = currentDate.value.getFullYear()
  const months = []

  for (let i = 0; i < 12; i++) {
    const monthDate = new Date(year, i, 1)
    months.push({
      month: i + 1,
      date: monthDate,
      isCurrentMonth: i === currentDate.value.getMonth(),
      monthName: monthDate.toLocaleString('zh-CN', { month: 'long' })
    })
  }

  return months
})

// 生成年份数据
const yearData = computed(() => {
  const currentYear = currentDate.value.getFullYear()
  const years = []
  const startYear = Math.floor(currentYear / 10) * 10

  for (let i = startYear; i < startYear + 10; i++) {
    years.push({
      year: i,
      isCurrentYear: i === currentYear
    })
  }

  return years
})

// 检查是否是今天
function isToday(date: Date) {
  const today = new Date()
  return date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate()
}

// 获取日期标记
function getDateMark(date: Date): DateMark | undefined {
  const dateStr = date.toISOString().split('T')[0]
  return safeDateMarks.value.find((mark: DateMark) => mark.date === dateStr)
}

// 切换视图
function switchView(view: ViewType) {
  currentView.value = view
  emit('viewChange', view)
}

// 切换月份
function changeMonth(delta: number) {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + delta, 1)
  emit('dateChange', currentDate.value.toISOString().split('T')[0])
}

// 切换年份
function changeYear(delta: number) {
  currentDate.value = new Date(currentDate.value.getFullYear() + delta, currentDate.value.getMonth(), 1)
  emit('dateChange', currentDate.value.toISOString().split('T')[0])
}

// 点击日期
function handleDateClick(date: Date, mark?: DateMark | undefined) {
  currentDate.value = date
  emit('dateChange', date.toISOString().split('T')[0])
  emit('dateClick', date.toISOString().split('T')[0], mark)
}

// 获取标记颜色
function getMarkColor(type: 'income' | 'expense' | 'recharge' | 'other' | string) {
  switch (type) {
    case 'income':
      return '#4CAF50'
    case 'expense':
      return '#F44336'
    case 'recharge':
      return '#2196F3'
    case 'other':
    default:
      return '#9E9E9E'
  }
}

// 获取标记背景颜色
function getMarkBgColor(type: 'income' | 'expense' | 'recharge' | 'other' | string) {
  switch (type) {
    case 'income':
      return 'rgba(76, 175, 80, 0.1)'
    case 'expense':
      return 'rgba(244, 67, 54, 0.1)'
    case 'recharge':
      return 'rgba(33, 150, 243, 0.1)'
    case 'other':
    default:
      return 'rgba(158, 158, 158, 0.1)'
  }
}

// 初始化
onMounted(() => {
  // 设置默认视图
  if (props.view) {
    currentView.value = props.view
  }
})
</script>

<template>
  <view class="calendar-container">
    <!-- 视图切换 -->
    <view class="view-switcher">
      <button class="view-btn" :class="[{ active: currentView === 'day' }]" @click="switchView('day')">日</button>
      <button class="view-btn" :class="[{ active: currentView === 'month' }]" @click="switchView('month')">月</button>
      <button class="view-btn" :class="[{ active: currentView === 'year' }]" @click="switchView('year')">年</button>
    </view>

    <!-- 日视图（月日历） -->
    <view v-if="currentView === 'day'" class="day-view">
      <!-- 年月导航 -->
      <view class="nav-header">
        <button class="nav-btn" @click="changeMonth(-1)">&lt;</button>
        <view class="nav-title">{{ currentDate.getFullYear() }}年{{ currentDate.getMonth() + 1 }}月</view>
        <button class="nav-btn" @click="changeMonth(1)">&gt;</button>
      </view>

      <!-- 星期标题 -->
      <view class="week-header">
        <view class="week-day">日</view>
        <view class="week-day">一</view>
        <view class="week-day">二</view>
        <view class="week-day">三</view>
        <view class="week-day">四</view>
        <view class="week-day">五</view>
        <view class="week-day">六</view>
      </view>

      <!-- 日期网格 -->
      <view class="calendar-grid">
        <view
          v-for="(item, index) in calendarData"
          :key="index"
          class="calendar-day"
          :class="{
            'current-month': item.isCurrentMonth,
            'other-month': !item.isCurrentMonth,
            'today': item.isToday
          }"
          @click="handleDateClick(item.date, getDateMark(item.date))"
        >
          <view class="day-number">{{ item.day }}</view>
          <view
            v-if="getDateMark(item.date)"
            class="date-mark"
            :style="{
              backgroundColor: getMarkBgColor(getDateMark(item.date)?.type || ''),
              color: getMarkColor(getDateMark(item.date)?.type || '')
            }"
          >
            <view class="mark-amount">{{ getDateMark(item.date)?.amount }}</view>
            <view class="mark-title">{{ getDateMark(item.date)?.title }}</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 月视图 -->
    <view v-if="currentView === 'month'" class="month-view">
      <!-- 年份导航 -->
      <view class="nav-header">
        <button class="nav-btn" @click="changeYear(-1)">&lt;</button>
        <view class="nav-title">{{ currentDate.getFullYear() }}年</view>
        <button class="nav-btn" @click="changeYear(1)">&gt;</button>
      </view>

      <!-- 月份网格 -->
      <view class="month-grid">
        <view
          v-for="(item, index) in monthData"
          :key="index"
          class="month-item"
          :class="{
            'current-month': item.isCurrentMonth
          }"
          @click="handleDateClick(item.date)"
        >
          <view class="month-name">{{ item.monthName }}</view>
          <view class="month-amount">
            {{ item.isCurrentMonth ? '1笔' : '3笔' }}
          </view>
          <view class="month-total">
            {{ item.isCurrentMonth ? '2700.88' : '232700.88' }}
          </view>
        </view>
      </view>
    </view>

    <!-- 年视图 -->
    <view v-if="currentView === 'year'" class="year-view">
      <!-- 年份范围导航 -->
      <view class="nav-header">
        <button class="nav-btn" @click="changeYear(-10)">&lt;</button>
        <view class="nav-title">{{ yearData.length > 0 ? `${yearData[0].year}-${yearData[yearData.length - 1].year}` : '' }}</view>
        <button class="nav-btn" @click="changeYear(10)">&gt;</button>
      </view>

      <!-- 年份网格 -->
      <view class="year-grid">
        <view
          v-for="(item, index) in yearData"
          :key="index"
          class="year-item"
          :class="{
            'current-year': item.isCurrentYear
          }"
          @click="handleDateClick(new Date(item.year, 0, 1))"
        >
          <view class="year-name">{{ item.year }}年</view>
          <view class="year-amount">
            {{ item.isCurrentYear ? '5笔' : '3笔' }}
          </view>
          <view class="year-total">
            {{ item.isCurrentYear ? '362700.88' : '232700.88' }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.calendar-container {
  width: 100%;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 16px;
}

/* 视图切换 */
.view-switcher {
  display: flex;
  margin-bottom: 16px;
  border-radius: 8px;
  background: #f5f5f5;
  overflow: hidden;
}

.view-btn {
  flex: 1;
  padding: 8px;
  background: transparent;
  border: none;
  font-size: 14px;
  color: #666;
  transition: all 0.3s;
}

.view-btn.active {
  background: #4caf50;
  color: #fff;
}

/* 导航头部 */
.nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.nav-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f5f5f5;
  border: none;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

/* 日视图 */
.day-view {
  width: 100%;
}

.week-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 8px;
}

.week-day {
  text-align: center;
  padding: 8px;
  font-size: 12px;
  color: #666;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.calendar-day {
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.calendar-day:hover {
  background: #f5f5f5;
}

.calendar-day.current-month {
  color: #333;
}

.calendar-day.other-month {
  color: #ccc;
}

.calendar-day.today {
  background: #e3f2fd;
}

.day-number {
  font-size: 14px;
  margin-bottom: 2px;
}

.date-mark {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 4px;
  padding: 2px;
  font-size: 10px;
}

.mark-amount {
  font-weight: bold;
}

.mark-title {
  font-size: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  text-align: center;
}

/* 月视图 */
.month-view {
  width: 100%;
}

.month-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.month-item {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.month-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.month-item.current-month {
  background: #f44336;
  color: #fff;
}

.month-name {
  font-size: 14px;
  margin-bottom: 4px;
}

.month-amount {
  font-size: 12px;
  margin-bottom: 4px;
}

.month-total {
  font-size: 12px;
  font-weight: bold;
}

/* 年视图 */
.year-view {
  width: 100%;
}

.year-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.year-item {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.year-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.year-item.current-year {
  background: #f44336;
  color: #fff;
}

.year-name {
  font-size: 14px;
  margin-bottom: 4px;
}

.year-amount {
  font-size: 12px;
  margin-bottom: 4px;
}

.year-total {
  font-size: 12px;
  font-weight: bold;
}
</style>
