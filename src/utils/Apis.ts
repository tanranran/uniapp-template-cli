import type { ToastOptions } from 'wot-design-uni/components/wd-toast/types.ts'
import type { httpInstance } from '@/utils/http'
// unplugin-auto-import-ignore
export namespace Apis {
  export const http = httpInstance

  // export function showToast(option: UniNamespace.ShowToastOptions | ToastOptions | string) {
  //   ui.showToast(option)
  // }
  //
  // export function showLoading(option: UniNamespace.ShowLoadingOptions | ToastOptions | string) {
  //   ui.showLoading(option)
  // }
}
