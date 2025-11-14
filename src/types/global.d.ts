declare global {
  interface BaseLayoutRef {
    showLoading: () => void
    showEmpty: () => void
    showSuccess: () => void
    showError: (errorStr: string, errorCallback: () => void) => void
  }
}
declare module 'vue' {
  interface ComponentCustomProperties {
    Apis: typeof Apis
  }
}
export {}
