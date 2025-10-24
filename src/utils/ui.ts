import type { ToastOptions } from 'wot-design-uni/components/wd-toast/types.ts'
import { isShowLoadingOptions, isToastOptions } from '@/utils/is.ts'
export default {
  showToast(option: UniNamespace.ShowToastOptions | ToastOptions | string) {
    if (isToastOptions(option)) {
      uni.showToast(option)
    } else if (typeof option === 'string') {
      uni.showToast({ title: option })
    } else {
      useGlobalToast().show(option)
    }
  },
  showLoading(option: UniNamespace.ShowLoadingOptions | ToastOptions | string) {
    if (isShowLoadingOptions(option)) {
      uni.showLoading(option)
    } else if (typeof option === 'string') {
      uni.showLoading({ title: option })
    } else {
      useGlobalLoading().loading(option)
    }
  }
}
