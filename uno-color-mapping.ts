import type { Rule } from 'unocss'

// 使用不同的键名来避免重复
export const colorMapping = {
  // 文字
  'text-333333': 'E0E0E0',
  'text-666666': 'A0A0A0',
  'text-999999': '6C6C6C',
  'text-CCCCCC': '666666',
  'text-DDDDDD': '333333',
  'text-000000': 'FFFFFF',
  'text-FD7807': 'FBA900',
  'text-E62828': 'F04848',
  'text-447DBD': '9ECDEE',

  // 页面背景
  'bg-page-F5F5F5': '121212',
  'bg-page-F7F7F7': '121212',
  'bg-page-F9F9F9': '121212',
  'bg-page-EEEEEE': '121212',

  // 卡片背景
  'bg-card-FFFFFF': '222222',
  'bg-card-F5F5F5': '222222',
  'bg-card-F7F7F7': '2C2C2C',
  'bg-card-F9F9F9': '2C2C2C',
  'bg-card-242629': 'E0E0E0',
  'bg-card-FAFAFA': '353535',
  'bg-card-FFEDEB': 'FFD6C6',

  // 标签&按钮
  'bg-tag-F5F5F5': '353535',
  'bg-tag-FFEDEB': '4B2929',
  'bg-tag-FFF4E7': '40300E',
  'bg-tag-FFFFFF': '353535',
  'bg-tag-DDDDDD': '333333',
  'bg-tag-EEEEEE': '353535',
  'bg-tag-F2F2F2': '2C2C2C',

  // 分割线&描边
  'border-CCCCCC': '7D7D7D',
  'border-DDDDDD': '5A5A5A',
  'border-EEEEEE': '353535',
  'border-F5F5F5': '2C2C2C',
  'border-F3F3F3': '121212',

  // 新搜索条
  'bg-search-F2F2F2': '353535',

  // 底部工具栏
  'bg-bottom-FFFFFF': '2E2E2E',

  // 输入框
  'bg-input-F5F5F5': '353535', // 背景
  'border-input-EEEEEE': '222222', // 描边

  // 企业色
  'brand-E62828': 'F04848'
} as const
// 生成快捷方式
export function generateDarkColorShortcuts() {
  const shortcuts: [string, string][] = []

  for (const [key, dark] of Object.entries(colorMapping)) {
    // 从键名中提取原始颜色值（去掉前缀）
    const parts = key.split('-')
    const light = parts.slice(-1)[0] // 获取最后一个部分，即颜色值

    // 文字颜色
    shortcuts.push([`color-${light}-${dark}`, `text-#${light} dark:text-#${dark}`])

    // 背景颜色
    shortcuts.push([`bg-${light}-${dark}`, `bg-#${light} dark:bg-#${dark}`])

    // 边框颜色
    shortcuts.push([`border-${light}-${dark}`, `border-#${light} dark:border-#${dark}`])

    // 悬停颜色
    shortcuts.push([`hover-bg-${light}-${dark}`, `hover:bg-#${light} dark:hover:bg-#${dark}`])
  }

  return shortcuts
}

// 修正后的颜色规则生成器
function createColorRule(pattern: RegExp, property: string): Rule {
  return [
    pattern,
    ([_, lightColor, darkColor]) => {
      const isValidHex = (color: string) => /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)

      if (!lightColor || !darkColor || !isValidHex(lightColor) || !isValidHex(darkColor)) {
        return null
      }

      return {
        [property]: `#${lightColor}`,
        '.dark &': {
          [property]: `#${darkColor}`
        }
      }
    }
  ] as Rule
}

export function generateDarkColorRules() {
  return [
    // 文字颜色规则
    createColorRule(/^color-(.+)-(.+)$/, 'color'),
    createColorRule(/^text-(.+)-(.+)$/, 'color'),

    // 背景颜色规则
    createColorRule(/^bg-(.+)-(.+)$/, 'background-color'),

    // 边框颜色规则
    createColorRule(/^border-(.+)-(.+)$/, 'border-color'),
    createColorRule(/^border-t-(.+)-(.+)$/, 'border-top-color'),
    createColorRule(/^border-r-(.+)-(.+)$/, 'border-right-color'),
    createColorRule(/^border-b-(.+)-(.+)$/, 'border-bottom-color'),
    createColorRule(/^border-l-(.+)-(.+)$/, 'border-left-color')
  ]
}
