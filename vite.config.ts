import { defineConfig } from 'vite';
import Uni from '@uni-helper/plugin-uni';
import Components from '@uni-helper/vite-plugin-uni-components';
import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
/**
 * 分包优化、模块异步跨包调用、组件异步跨包引用
 * @see https://github.com/uni-ku/bundle-optimizer
 */
import Optimization from '@uni-ku/bundle-optimizer';
import CompressJson from '@binbinji/unplugin-compress-json/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import ViteRestart from 'vite-plugin-restart';
import { WotResolver } from '@uni-helper/vite-plugin-uni-components/resolvers';
import dayjs from 'dayjs';
import process from 'node:process';
import path from 'node:path';

// https://vitejs.dev/config/
export default async ({ command, mode }) => {
  // mode: 区分生产环境还是开发环境
  console.log('command, mode -> ', command, mode);
  const { UNI_PLATFORM } = process.env;
  console.log('UNI_PLATFORM -> ', UNI_PLATFORM); // 得到 mp-weixin, h5, app 等
  return defineConfig({
    plugins: [
      {
        // 临时解决 dcloudio 官方的 @dcloudio/uni-mp-compiler 出现的编译 BUG
        // 参考 github issue: https://github.com/dcloudio/uni-app/issues/4952
        // 自定义插件禁用 vite:vue 插件的 devToolsEnabled，强制编译 vue 模板时 inline 为 true
        name: 'fix-vite-plugin-vue',
        configResolved(config) {
          const plugin = config.plugins.find((p) => p.name === 'vite:vue');
          if (plugin && plugin.api && plugin.api.options) {
            plugin.api.options.devToolsEnabled = false;
          }
        }
      },
      UnoCSS(),
      Components({
        resolvers: [WotResolver()]
      }),
      AutoImport({
        imports: [
          'vue',
          'uni-app',
          {
            from: 'wot-design-uni',
            imports: ['useToast', 'useMessage', 'useNotify', 'CommonUtil']
          }
        ],
        dts: 'src/types/auto-import.d.ts',
        dirs: ['src/composables', 'src/store', 'src/utils', 'src/hooks'], // 自动导入 hooks
        eslintrc: { enabled: true },
        vueTemplate: true // default false
      }),
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
      ViteRestart({
        // 通过这个插件，在修改vite.config.js文件则不需要重新运行也生效配置
        restart: ['vite.config.js']
      }),
      // h5环境增加 BUILD_TIME 和 BUILD_BRANCH
      UNI_PLATFORM === 'h5' && {
        name: 'html-transform',
        transformIndexHtml(html) {
          return html.replace('%BUILD_TIME%', dayjs().format('YYYY-MM-DD HH:mm:ss'));
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
        }),
      Uni()
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
    build: {
      sourcemap: false,
      target: 'es6',
      cssTarget: 'chrome61',
      // 开发环境不用压缩
      minify: mode === 'development' ? false : 'esbuild'
    }
  });
};
