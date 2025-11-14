import type { App } from '@vue/runtime-core'
export const httpInstance = new Http()

export function setupHttp(app: App<Element>) {
  //网络请求拦截器
  setupRequest(app)
}
