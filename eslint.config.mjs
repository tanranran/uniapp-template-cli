import uni from '@uni-helper/eslint-config'
export default uni({
  unocss: true,
  vue: true,
  markdown: false,
  ignores: [
    // 忽略uni_modules目录
    '**/uni_modules/',
    // 忽略原生插件目录
    '**/nativeplugins/',
    'dist',
    // unplugin-auto-import 生成的类型文件，每次提交都改变，所以加入这里吧，与 .gitignore 配合使用
    'auto-import.d.ts',
    // vite-plugin-uni-pages 生成的类型文件，每次切换分支都一堆不同的，所以直接 .gitignore
    'uni-pages.d.ts',
    // 插件生成的文件
    'src/pages.json',
    'src/manifest.json',
    // 忽略自动生成文件
    'src/service/**'
  ],
  plugins: ['@unocss'],
  // https://eslint-config.antfu.me/rules
  rules: {
    'no-useless-return': 'off',
    'no-console': 'off',
    'no-unused-vars': 'off',
    'vue/no-unused-refs': 'off',
    'unused-imports/no-unused-vars': 'off',
    'eslint-comments/no-unlimited-disable': 'off',
    'jsdoc/check-param-names': 'off',
    'jsdoc/require-returns-description': 'off',
    'ts/no-empty-object-type': 'off',
    'no-extend-native': 'off',
    'vue/singleline-html-element-content-newline': [
      'error',
      {
        externalIgnores: ['text']
      }
    ],
    'vue/block-order': [
      'error',
      {
        order: [['script', 'template'], 'style']
      }
    ],
    '@unocss/enforce-class-compile': 'warn'
  },
  formatters: {
    /**
     * Format CSS, LESS, SCSS files, also the `<style>` blocks in Vue
     * By default uses Prettier
     */
    css: true,
    /**
     * Format HTML files
     * By default uses Prettier
     */
    html: true
  }
})
