import { debounce as _debounce, throttle as _throttle } from 'wot-design-uni/components/common/util'
import type { App } from '@vue/runtime-core'
type DebounceOptions = {
  leading?: boolean // 是否在延迟时间开始时调用函数
  trailing?: boolean // 是否在延迟时间结束时调用函数
}
/**
 * 简化版 UUID v4 生成器
 * @returns 生成的 UUID 字符串
 */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// 防抖 在一段时间内函数被多次触发，防抖让函数在一段时间后最终只执行一次
export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number = 300): (...args: Parameters<T>) => void {
  let timer: number | null = null
  return function (...args: Parameters<T>): void {
    if (timer !== null) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(...args)
      timer = null
    }, delay) as unknown as number
  }
}

// 节流 在规定的时间内，只执行一次
export function throttle<T extends (...args: any[]) => any>(fn: T, delay: number = 300): (...args: Parameters<T>) => void {
  let timer: number | null = null

  return (...args: Parameters<T>): void => {
    if (timer === null) {
      timer = window.setTimeout(() => {
        fn(...args)
        timer = null
      }, delay) as unknown as number
    }
  }
}
