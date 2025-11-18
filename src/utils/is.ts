export function isToastOptions(option: any): option is UniApp.ShowToastOptions {
  return option && typeof option === 'object' && ('title' in option || 'icon' in option || 'duration' in option)
}

export function isShowLoadingOptions(option: any): option is UniApp.ShowLoadingOptions {
  return option && typeof option === 'object' && 'title' in option
}
