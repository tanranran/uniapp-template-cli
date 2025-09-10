import { defineConfig, presetAttributify, presetIcons, transformerDirectives, transformerVariantGroup } from 'unocss';
import { presetApplet, presetRemRpx, transformerApplet, transformerAttributify } from 'unocss-applet';

const isApplet = process.env?.UNI_PLATFORM?.startsWith('mp-') ?? false;
const presets = [];
const transformers = [];
if (isApplet) {
  presets.push(presetApplet(), presetRemRpx());
  transformers.push(
    // 小程序用 @apply 功能
    transformerApplet(),
    transformerAttributify()
  );
} else {
  presets.push(
    presetApplet(),
    presetRemRpx({
      baseFontSize: 16,
      mode: 'rpx2rem'
    })
  );
}

export default defineConfig({
  presets: [
    ...presets,
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle'
      }
    }),
    // 属性模式（在class 属性过多的情况下优先使用属性模式，否则将会变得难以维护）
    //https://unocss.dev/presets/attributify#attributify-mode
    presetAttributify()
  ],
  transformers: [
    // 启用指令功能：主要用于支持 @apply、@screen 和 theme() 等 CSS 指令
    transformerDirectives(),
    // 启用 () 分组功能
    // 支持css class组合，eg: `<div class="hover:(bg-gray-400 font-medium) font-(light mono)">测试 unocss</div>`
    transformerVariantGroup()
  ],
  shortcuts: [{ 'flex-center': 'flex justify-center items-center' }, { 'flex-col-center': 'flex justify-center items-center flex-col' }],
  // 动态图标需要在这里配置，或者写在vue页面中注释掉
  // safelist: ['i-carbon-code'],
  rules: [
    [
      'p-safe',
      {
        padding: 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)'
      }
    ],
    ['pt-safe', { 'padding-top': 'env(safe-area-inset-top)' }],
    ['pb-safe', { 'padding-bottom': 'env(safe-area-inset-bottom)' }]
  ],
  theme: {
    colors: {
      /** 主题色，用法如: text-primary */
      primary: 'var(--wot-color-theme,#0957DE)'
    },
    fontSize: {
      /** 提供更小号的字体，用法如：text-2xs */
      '2xs': ['20rpx', '28rpx'],
      '3xs': ['18rpx', '26rpx']
    }
  }
});
