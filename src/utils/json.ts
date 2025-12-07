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

export function parse<T = any>(value: string | T): T | null {
  if (typeof value === 'string') {
    try {
      return JSON.parse(value) as T
    } catch {
      return null
    }
  }
  return value as T
}

export function stringify(value?: any): string {
  try {
    if (isNull(value)) {
      return ''
    }
    const seen = new WeakSet()
    return JSON.stringify(value, (key, val) => {
      if (typeof val === 'object' && val !== null) {
        if (seen.has(val)) {
          return '[Circular Reference]'
        }
        seen.add(val)
      }
      return val
    })
  } catch (error) {
    console.warn('Stringify failed:', error)
    return ''
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
export function safeJsonParse<T = string>(jsonString: string | null, defaultValue?: T): T | undefined {
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
