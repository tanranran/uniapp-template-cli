// utils/ref.ts
import { ref, type Ref } from 'vue'

/**
 * 组件类型标注
 * @param _component 组件实例
 * @returns 完整类型标注的响应式组件实例
 */
export const useComponentRef = <T extends abstract new (...args: any) => any>(_component: T) => {
  return ref<InstanceType<T>>()
}

// 创建暴露类型的引用
export function useExposedRef<T>(initialValue: T | null = null): Ref<T | null> {
  return ref(initialValue) as Ref<T | null>
}
