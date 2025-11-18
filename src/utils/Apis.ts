// unplugin-auto-import-ignore
import { httpInstance, Request } from '@/http'
import type { ShowLoadingOption, ToastIcon, ToastOption } from '@/utils/ui.ts'

export class Apis {
  static http: Request = httpInstance

  static showToast(option: ToastOption, icon?: ToastIcon) {
    ui.showToast(option)
  }

  static showLoading(option: ShowLoadingOption) {
    ui.showLoading(option)
  }

  static hideLoading(isSystem: boolean = true) {
    ui.hideLoading(isSystem)
  }
}
