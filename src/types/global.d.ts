declare global {
  interface BaseLayoutRef {
    showLoading: () => void
    showEmpty: () => void
    showSuccess: () => void
    showError: (errorStr: string, errorCallback: () => void) => void
  }
}
export {}
