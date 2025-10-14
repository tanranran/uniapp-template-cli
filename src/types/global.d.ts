declare interface BaseLayoutRef {
  showLoading: () => void
  showEmpty: () => void
  showSuccess: () => void
  showError: (errorStr: string, errorCallback: () => void) => void
  showToast: (msg: string) => void
}

// 添加类型导出，以便可以自动导入
type BaseLayoutRefType = BaseLayoutRef

export { BaseLayoutRefType }

export {}
