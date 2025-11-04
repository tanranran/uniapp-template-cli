/**
 * 判断字符串是否是 json 字符串
 * @param {any} str 字符串
 * @returns {boolean} 是否为 json 字符串
 */
export function isJSON(str: any): boolean {
  if (typeof str !== 'string') {
    return false
  }

  try {
    return typeof JSON.parse(str) === 'object'
  } catch {
    return false
  }
}

/**
 * 尝试解析 JSON 字符串，如果解析失败则返回 null。
 * @param {string} str 要解析的字符串
 * @returns {any | null} 解析后的对象，解析失败返回 null
 */
export function parseJSON(str: string): any | null {
  try {
    return JSON.parse(str)
  } catch {
    return null
  }
}

/**
 * 尝试将JSON 字符串转换为 对象，如果转换失败则返回 defaultValue(默认为 undefined)。
 * @param jsonString - 要转换的 JSON 字符串
 * @param defaultValue - 默认值
 * @returns 转换后的 对象，转换失败返回 defaultValue
 */
export const safeJsonParse = <T = string>(jsonString: string | null, defaultValue?: T): T | undefined => {
  if (typeof jsonString !== 'string') {
    return defaultValue
  }

  try {
    return JSON.parse(jsonString)
  } catch (e) {
    console.error('JSON parse error:', e)
    return defaultValue
  }
}
