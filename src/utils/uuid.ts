type UUID = `${string}-${string}-${string}-${string}-${string}`

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

/** 判断当前是否 Secure Context，可解锁 crypto.randomUUID */
const isSecureContext = () => typeof globalThis.crypto !== 'undefined' && typeof crypto.randomUUID === 'function'

/** 使用 crypto.getRandomValues 手动拼 v4 UUID */
function uuidv4ByRandomValues(): UUID {
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  // Per RFC4122, set version (4) and variant (1)
  bytes[6] = ((bytes[6] ?? 0) & 0x0f) | 0x40
  bytes[8] = ((bytes[8] ?? 0) & 0x3f) | 0x80
  const hex = [...bytes].map((b) => b.toString(16).padStart(2, '0'))
  return `${hex.slice(0, 4).join('')}-${hex[4]}${hex[5]}-${hex[6]}${hex[7]}-${hex[8]}${hex[9]}-${hex.slice(10, 16).join('')}` as UUID
}

/** 最末兜底：控制台告警，生产请避免 */
function uuidv4ByMath(): UUID {
  console.warn('[uuid] falling back to Math.random() — NOT crypto secure!')
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  }) as UUID
}

/**
 * 跨环境 UUID v4 生成器
 * @returns RFC4122 标准 UUID
 */
export function uuid(): UUID {
  if (isSecureContext()) return crypto.randomUUID() as UUID
  if (typeof crypto !== 'undefined' && typeof (crypto as any).getRandomValues === 'function') {
    return uuidv4ByRandomValues()
  }
  return uuidv4ByMath()
}

/** 校验字符串是否为合法 UUID */
export const isUUID = (str: string): str is UUID => UUID_REGEX.test(str)
