export function isToastOptions(option: any): option is UniNamespace.ShowToastOptions {
  return option && typeof option === 'object' && ('title' in option || 'icon' in option || 'duration' in option)
}

export function isShowLoadingOptions(option: any): option is UniNamespace.ShowLoadingOptions {
  return option && typeof option === 'object' && 'title' in option
}
