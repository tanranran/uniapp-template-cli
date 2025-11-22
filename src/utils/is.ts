/**
 * 判断是否为 ShowToastOptions 类型
 * @param option 待判断的对象
 * @returns 是否符合 ShowToastOptions 接口特征
 */
export function isToastOptions(option: any): option is UniApp.ShowToastOptions {
  return option && typeof option === 'object' && ('title' in option || 'icon' in option || 'duration' in option)
}

/**
 * 判断是否为 ShowLoadingOptions 类型
 * @param option 待判断的对象
 * @returns 是否符合 ShowLoadingOptions 接口特征
 */
export function isShowLoadingOptions(option: any): option is UniApp.ShowLoadingOptions {
  return option && typeof option === 'object' && 'title' in option
}
