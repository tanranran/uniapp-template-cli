/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}


declare const __UNI_PLATFORM__: 'app' | 'h5' | 'mp-alipay' | 'mp-baidu' | 'mp-kuaishou' | 'mp-lark' | 'mp-qq' | 'mp-tiktok' | 'mp-weixin' | 'mp-xiaochengxu'
