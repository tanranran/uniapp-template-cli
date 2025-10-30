import { createSSRApp } from 'vue'
import App from './App.vue'
import 'virtual:uno.css'
import '@/styles/common.scss'
import { setupStore } from '@/store'
export function createApp() {
  const app = createSSRApp(App)
  // 挂载状态管理
  setupStore(app)
  return {
    app
  }
}

uni.$zp = {
  config: {
    //配置分页默认pageSize为20
    'default-page-size': 20,
    //配置空数据图默认描述文字为：空空如也~~
    'empty-view-text': '空空如也~~',
    'safe-area-inset-bottom': true,
    'use-safe-area-placeholder': true
  }
}
