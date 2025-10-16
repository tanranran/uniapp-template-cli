import { defineConfig, loadEnv } from 'vite'
import Uni from '@uni-helper/plugin-uni'
import UniHelperComponents from '@uni-helper/vite-plugin-uni-components'
// @see https://github.com/uni-helper/vite-plugin-uni-manifest
import UniHelperManifest from '@uni-helper/vite-plugin-uni-manifest'
import UnoCSS from '@unocss/vite'
import UniKuRoot from '@uni-ku/root'
// @see https://uni-helper.js.org/vite-plugin-uni-pages
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import AutoImport from 'unplugin-auto-import/vite'
import { WotResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'

/**
 * 分包优化、模块异步跨包调用、组件异步跨包引用
 * @see https://github.com/uni-ku/bundle-optimizer
 */
import Optimization from '@uni-ku/bundle-optimizer'
import CompressJson from '@binbinji/unplugin-compress-json/vite'
import ViteRestart from 'vite-plugin-restart'
import { visualizer } from 'rollup-plugin-visualizer'
import { AutoVersion } from './vite-plugins/vite-plugin-auto-version'
import dayjs from 'dayjs'
import process from 'node:process'
import path from 'node:path'
import { handlePageName, writePageConst } from './vite-plugins/vite-config-uni-pages'

// https://vitejs.dev/config/
export default async ({ command, mode }) => {
  const { UNI_PLATFORM } = process.env
  const env = loadEnv(mode, path.resolve(process.cwd(), 'env'))
  const { VITE_APP_PORT, VITE_SERVER_BASEURL, VITE_APP_TITLE, VITE_DELETE_CONSOLE, VITE_APP_PUBLIC_BASE } = env
  // console.log('环境变量 env -> ', env)

  // mode: 区分生产环境还是开发环境
  console.log('command, mode -> ', command, mode)
  console.log('UNI_PLATFORM -> ', UNI_PLATFORM) // 得到 mp-weixin, h5, app 等

  return defineConfig({
    envDir: './env', // 自定义env目录
    base: VITE_APP_PUBLIC_BASE,
    plugins: [
      {
        // 临时解决 dcloudio 官方的 @dcloudio/uni-mp-compiler 出现的编译 BUG
        // 参考 github issue: https://github.com/dcloudio/uni-app/issues/4952
        // 自定义插件禁用 vite:vue 插件的 devToolsEnabled，强制编译 vue 模板时 inline 为 true
        name: 'fix-vite-plugin-vue',
        configResolved(config) {
          const plugin = config.plugins.find((p) => p.name === 'vite:vue')
          if (plugin && plugin.api && plugin.api.options) {
            plugin.api.options.devToolsEnabled = false
          }
        }
      },
      AutoVersion({
        type: 'patch', // 可选: 'patch', 'minor', 'major'
        inject: true
      }),
      UniPages({
        exclude: ['**/components/**/**.*'],
        dts: 'src/types/uni-pages.d.ts',
        onAfterMergePageMetaData: (ctx) => {
          handlePageName(ctx, 'pageMetaData')
          handlePageName(ctx, 'subPageMetaData')
        }
      }),
      await UniHelperManifest(),
      UniHelperComponents({
        resolvers: [WotResolver()],
        extensions: ['vue'],
        deep: true, // 是否递归扫描子目录，
        directoryAsNamespace: false, // 是否把目录名作为命名空间前缀，true 时组件名为 目录名+组件名，
        dts: 'src/types/components.d.ts', // 自动生成的组件类型声明文件路径（用于 TypeScript 支持）
        dirs: ['src/components']
      }),
      UniKuRoot({
        enabledGlobalRef: true
      }),
      ViteRestart({
        // 通过这个插件，在修改vite.config.js文件则不需要重新运行也生效配置
        restart: ['vite.config.js']
      }),
      Uni(),
      AutoImport({
        imports: [
          'vue',
          'pinia',
          'uni-app',
          {
            'wot-design-uni': ['useToast', 'useMessage', 'useNotify', 'CommonUtil'],
            'z-paging/types': ['zPaging', 'ZPagingVirtualItem']
          }
        ],
        dts: 'src/types/auto-import.d.ts',
        dirs: ['src/composables/**', 'src/store/**', 'src/utils/**', 'src/hooks/**', 'src/utils/**', 'src/router/**'], // 自动导入 hooks
        eslintrc: {
          enabled: true,
          globalsPropValue: true
        },
        vueTemplate: true
      }),
      UnoCSS(),
      Optimization({
        enable: {
          optimization: true,
          'async-import': true,
          'async-component': true
        },
        dts: {
          enable: true,
          base: 'src/types'
        },
        logger: false
      }),
      CompressJson(),
      // h5环境增加 BUILD_TIME 和 BUILD_BRANCH
      UNI_PLATFORM === 'h5' && {
        name: 'html-transform',
        transformIndexHtml(html) {
          return html.replace('%BUILD_TIME%', dayjs().format('YYYY-MM-DD HH:mm:ss')).replace('%VITE_APP_TITLE%', VITE_APP_TITLE)
        }
      },
      // 打包分析插件，h5 + 生产环境才弹出
      UNI_PLATFORM === 'h5' &&
        mode === 'production' &&
        visualizer({
          filename: './node_modules/.cache/visualizer/stats.html',
          open: true,
          gzipSize: true,
          brotliSize: true
        })
    ],
    define: {
      __UNI_PLATFORM__: JSON.stringify(UNI_PLATFORM)
    },
    resolve: {
      alias: {
        '@': path.join(process.cwd(), './src'),
        '@img': path.join(process.cwd(), './src/static/images')
      }
    },
    server: {
      host: '0.0.0.0',
      hmr: true,
      port: Number.parseInt(VITE_APP_PORT, 10)
    },
    esbuild: {
      drop: VITE_DELETE_CONSOLE === 'true' ? ['console', 'debugger'] : ['debugger']
    },
    build: {
      sourcemap: false,
      target: 'es2015',
      cssTarget: 'chrome61',
      cssMinify: mode === 'development' ? false : 'esbuild', // 开发环境不用压缩
      minify: mode === 'development' ? false : 'esbuild' // 开发环境不用压缩
    }
  })
}
