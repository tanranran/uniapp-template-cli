// 生成颜色相关的类型
import { colorMapping } from '../../uno-color-mapping.ts'

// 创建映射对象
const colorMappingObject = Object.fromEntries(
  Object.entries(colorMapping).map(([key, value]) => {
    const parts = key.split('-')
    const originalColor = parts.slice(-1)[0] // 获取最后一个部分，即颜色值
    return [originalColor, value]
  })
) as {
  K: string
}

// 修正类型定义
type ColorKeys = keyof typeof colorMappingObject
type ColorPairs = {
  [K in ColorKeys]: `${K}-${(typeof colorMappingObject)[K]}`
}[ColorKeys]

// 生成快捷方式类型
export type DarkColorShortcut = `color-${ColorPairs}` | `bg-${ColorPairs}` | `border-${ColorPairs}` | `hover-bg-${ColorPairs}`
