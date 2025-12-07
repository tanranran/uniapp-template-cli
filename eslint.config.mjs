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
  // https://eslint-config.antfu.me/rules
  rules: {
    // ==================== TypeScript 规则 ====================
    // http://eslint.cn/docs/rules/
    // https://typescript-eslint.io/rules/no-unused-vars/
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-redeclare': 'error',
    '@typescript-eslint/no-unused-vars': [2],
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-var-requires': 'off',

    // ==================== Vue 规则 ====================
    // https://eslint.vuejs.org/rules/
    // 注意：格式化相关的规则已由 eslint-config-prettier 自动禁用
    'vue/block-order': [
      'error',
      {
        order: [['script', 'template'], 'style']
      }
    ],
    'vue/comment-directive': 'off',
    'vue/custom-event-name-casing': 'off',
    'vue/event-name-casing': 'off',
    'vue/first-attribute-linebreak': [
      'warn',
      {
        singleline: 'ignore',
        multiline: 'ignore'
      }
    ],
    'vue/html-closing-bracket-newline': [
      'warn',
      {
        singleline: 'never',
        multiline: 'never'
      }
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: { void: 'always', normal: 'always', component: 'always' }
      }
    ],
    'vue/max-attributes-per-line': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-arrow-functions-in-watch': 'off',
    'vue/no-deprecated-v-on-native-modifier': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/no-parsing-error': 'off',
    'vue/no-template-key': 'off',
    'vue/no-unused-refs': 'off',
    'vue/no-v-html': 'off',
    'vue/no-v-model-argument': 'off',
    'vue/one-component-per-file': 'off',
    'vue/prop-name-casing': 'off',
    'vue/require-default-prop': 'off',
    'vue/singleline-html-element-content-newline': 'off',

    // ==================== 样式规则 ====================
    '@stylistic/brace-style': 'off',
    'comma-dangle': ['error', 'never'],
    'style/arrow-parens': ['error', 'always'],
    'style/comma-dangle': 'off',
    'style/spaced-comment': 'off',

    // ==================== 其他规则 ====================
    'antfu/if-newline': 'off',
    'eslint-comments/no-unlimited-disable': 'off',
    'generator-star-spacing': 'off',
    'jsdoc/check-param-names': 'off',
    'jsdoc/require-returns-description': 'off',
    'no-case-declarations': 'off',
    'no-console': 'off',
    'no-constant-condition': 'off',
    'no-extend-native': 'off',
    'no-prototype-builtins': 'off',
    'no-redeclare': 'off',
    'no-restricted-globals': 'off',
    'no-restricted-syntax': 'off',
    'no-sparse-arrays': 'off',
    'no-unreachable': 'off',
    'no-unused-vars': 'off', // 使用 @typescript-eslint/no-unused-vars 代替
    'no-use-before-define': 'off',
    'no-useless-escape': 'off',
    'no-useless-return': 'off',
    'node/prefer-global/process': 'off',
    'ts/no-empty-object-type': 'off',
    'ts/no-require-imports': 'off',
    'ts/no-unused-vars': 'off',
    'unicorn/number-literal-case': 'off',
    'unused-imports/no-unused-vars': 'off',
    '@stylistic/operator-linebreak': 'off',
    'style/indent-binary-ops': 'off'
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
