// 手动解析命令行参数获取 mode
import path from 'node:path'
import process from 'node:process'

import { loadEnv } from 'vite'

function getMode() {
  const args = process.argv.slice(2) // 发布[ 'build', '-p', 'mp-weixin' ] 运行 [ '-p', 'mp-weixin' ]
  const modeFlagIndex = args.findIndex((arg) => arg === '--mode')
  return modeFlagIndex !== -1 ? args[modeFlagIndex + 1] : args[0] === 'build' ? 'production' : 'development' // 默认 development
}
// 获取环境变量的范例
export const env = loadEnv(`${getMode()}`, path.resolve(process.cwd(), 'env'))
