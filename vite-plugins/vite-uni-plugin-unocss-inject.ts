import type { Plugin } from 'vite'
import { join } from 'node:path'
export interface UnoCssInjectOptions {
  srcDir?: string
  mainEntry?: string
}
export default function UnoCssInject({ srcDir, mainEntry = 'main.ts' }: UnoCssInjectOptions = {}): Plugin {
  const sourceRoot = srcDir ?? join(process.cwd(), 'src')
  const mainEntryFile = join(sourceRoot, mainEntry)
  const CssFileReg = /\.css$/
  const StyleExtMap = new Map(Object.entries({ 'mp-weixin': '.wxss', 'mp-alipay': '.acss' }))
  return {
    name: 'vite-uni-plugin-unocss-inject',
    transform: {
      order: 'post',
      handler(code, id) {
        if (id === mainEntryFile) return '\nimport "virtual:uno.css";\n' + code
      }
    },
    generateBundle: {
      order: 'post',
      handler(_, bundle) {
        Object.keys(bundle).forEach((key) => {
          const { type, fileName } = bundle[key]
          if (type === 'asset' && CssFileReg.test(fileName)) {
            bundle[key].fileName = fileName.replace(CssFileReg, StyleExtMap.get(process.env.VITE_PLATFORM)!)
          }
        })
      }
    }
  } as Plugin
}
