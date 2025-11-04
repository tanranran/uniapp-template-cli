import { debounce as _debounce, throttle as _throttle } from 'wot-design-uni/components/common/util'
type DebounceOptions = {
  leading?: boolean // 是否在延迟时间开始时调用函数
  trailing?: boolean // 是否在延迟时间结束时调用函数
}

// 防抖 在一段时间内函数被多次触发，防抖让函数在一段时间后最终只执行一次
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number = 100, options: DebounceOptions = {}): T {
  return _debounce(func, wait, options)
}

// 节流 在规定的时间内，只执行一次
export function throttle(func: Function, wait: number = 1000): Function {
  return _throttle(func, wait)
}
