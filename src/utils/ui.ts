import type { ToastOptions } from 'wot-design-uni/components/wd-toast/types.ts'

const toast = useGlobalToast()
const loading = useGlobalLoading()
export default {
  showToast(option: UniNamespace.ShowToastOptions | ToastOptions | string) {
    // uni.showToast(typeof option === 'string' ? { title: option } : option)
    toast.show(option)
  },
  showLoading(option: UniNamespace.ShowLoadingOptions | ToastOptions | string) {
    // uni.showLoading(typeof option === 'string' ? { title: option } : option)
    loading.loading(option)
  }
}
