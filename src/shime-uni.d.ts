export {}
declare module 'vue' {
  type Hooks = App.AppInstance & Page.PageInstance
  interface ComponentCustomOptions extends Hooks {}
}

// 为组件属性添加类型提示
interface ComponentProps {
  /**
   * UnoCSS 类名，支持深色模式颜色快捷方式
   * @example 'bg-ff5900-20202a' - 橙色背景，深色模式下为深色背景
   * @example 'color-000000-ffffff' - 黑色文字，深色模式下为白色文字
   */
  class?: string
  /**
   * UnoCSS 样式类名
   * @example 'btn-primary' - 主要按钮样式
   * @example 'card' - 卡片样式
   */
  unocss?: string
}
