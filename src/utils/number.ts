/**
 * 判断是否是数值
 * @param value 需要判断的参数
 * @returns
 * @version Egret 2.4
 * @platform Web,Native
 * @language zh_CN
 */
export function isNumber(value: any): boolean {
  try {
    // 首先确保 value 不是 null 或 undefined
    if (value === null || value === undefined) {
      return false
    }
    // 如果已经是数字类型，直接判断是否是 NaN
    if (typeof value === 'number') {
      return !Number.isNaN(value)
    }
    // 如果不是字符串类型，比如对象、布尔值等，不视为合法数字
    if (typeof value !== 'string') {
      return false
    }
    // 此时 value 是字符串，去除前后空格
    const str = value.trim()
    // 空字符串或纯空格字符串直接返回 false
    if (str === '') {
      return false
    }
    // 最后尝试转换为数字并判断是否为 NaN
    const num = Number(str)
    return !Number.isNaN(num)
  } catch (e) {
    return false
  }
}

export function toInt(value: any, defaultValue: number = 0): number {
  try {
    if (value === null || value === undefined) {
      return defaultValue
    }
    const parsedValue = Number.parseInt(value)
    if (Number.isNaN(parsedValue)) {
      return defaultValue
    }
    return parsedValue
  } catch (e) {
    return defaultValue
  }
}

/**
 * 将字符串转换为浮点数。
 * @param value
 * @param defaultValue
 * @returns
 */
export function toFloat(value: string, defaultValue: number = 0): number {
  try {
    const parsedValue = Number.parseFloat(value)
    if (Number.isNaN(parsedValue)) {
      return defaultValue
    }
    return parsedValue
  } catch (e) {
    return defaultValue
  }
}
