import uni from '@uni-helper/eslint-config'

export default uni({
  unocss: true,
  vue: true,
  markdown: false,
  ignores: [
    'node_modules',
    '.nuxt',
    'dist',
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
    'src/service/**',
  ],
  // https://eslint-config.antfu.me/rules
  rules: {
    // ==================== TypeScript 规则 ====================
    // http://eslint.cn/docs/rules/
    // https://typescript-eslint.io/rules/no-unused-vars/
    '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
    '@typescript-eslint/ban-types': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-function': ['warn', { 'allow': ['arrowFunctions', 'functions', 'methods'] }],
    '@typescript-eslint/no-explicit-any': ['error', { 'fixToUnknown': true, 'ignoreRestArgs': true }],
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-redeclare': 'error',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { 'functions': false, 'classes': true, 'variables': true }],
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/prefer-readonly': 'warn',
    '@typescript-eslint/prefer-type-alias': 'warn',

    // ==================== Vue 规则 ====================
    // https://eslint.vuejs.org/rules/
    // 注意：格式化相关的规则已由 eslint-config-prettier 自动禁用
    'vue/block-order': [
      'error',
      {
        order: ['script', 'template', 'style'],
      },
    ],
    'vue/component-api-style': ['error', ['script-setup']],
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/custom-event-name-casing': ['error', 'camelCase'],
    'vue/define-emits-declaration': ['error', 'type-based'],
    'vue/define-props-declaration': ['error', 'type-based'],
    'vue/eqeqeq': ['error', 'smart'],
    'vue/html-closing-bracket-newline': [
      'warn',
      {
        singleline: 'never',
        multiline: 'always',
      },
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: { void: 'always', normal: 'always', component: 'always' },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/max-attributes-per-line': ['warn', { 'singleline': 5, 'multiline': 1 }],
    'vue/multi-word-component-names': ['warn', { 'ignores': ['index', '404'] }],
    'vue/no-arrow-functions-in-watch': 'off',
    'vue/no-deprecated-v-on-native-modifier': 'error',
    'vue/no-dupe-keys': 'error',
    'vue/no-duplicate-attr-inheritance': 'error',
    'vue/no-empty-component-block': 'error',
    'vue/no-unused-refs': 'warn',
    'vue/no-v-html': 'warn',
    'vue/one-component-per-file': 'error',
    'vue/prop-name-casing': ['error', 'camelCase'],
    'vue/require-prop-types': 'error',
    'vue/script-setup-uses-vars': 'error',
    'vue/valid-define-emits': 'error',
    'vue/valid-define-props': 'error',
    'vue/valid-v-for': 'error',
    'vue/valid-v-if': 'error',
    'vue/valid-v-model': 'error',
    'vue/valid-v-on': 'error',
    'vue/valid-v-slot': 'error',
    'vue/v-for-delimiter-style': ['error', 'in'],
    'vue/v-slot-style': ['error', { 'atComponent': 'v-slot', 'default': 'v-slot', 'named': 'v-slot' }],

    // ==================== 样式规则 ====================
    '@stylistic/brace-style': ['error', '1tbs'],
    '@stylistic/comma-dangle': ['error', 'never'],
    '@stylistic/indent': ['error', 2, { 'SwitchCase': 1 }],
    '@stylistic/quotes': ['error', 'single', { 'avoidEscape': true }],
    '@stylistic/semi': ['error', 'never'],
    'style/arrow-parens': ['error', 'always'],
    'style/comma-spacing': ['error', { 'before': false, 'after': true }],
    'style/key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }],
    'style/space-before-blocks': ['error', 'always'],
    'style/space-infix-ops': ['error'],

    // ==================== 其他规则 ====================
    'antfu/if-newline': 'error',
    'eslint-comments/no-unlimited-disable': 'error',
    'eslint-comments/require-description': 'error',
    'generator-star-spacing': ['error', { 'before': true, 'after': true }],
    'jsdoc/check-param-names': 'off',
    'jsdoc/require-returns-description': 'off',
    'no-case-declarations': 'error',
    'no-console': ['warn', { 'allow': ['error', 'warn'] }],
    'no-constant-condition': ['warn', { 'checkLoops': false }],
    'no-dupe-args': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-empty': ['error', { 'allowEmptyCatch': true }],
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-boolean-cast': 'error',
    'no-fallthrough': 'error',
    'no-prototype-builtins': 'error',
    'no-redeclare': 'error',
    'no-return-await': 'error',
    'no-sparse-arrays': 'error',
    'no-unreachable': 'error',
    'no-unused-vars': 'off', // 使用 @typescript-eslint/no-unused-vars 代替
    'no-use-before-define': 'off', // 使用 @typescript-eslint/no-use-before-define 代替
    'no-useless-computed-key': 'error',
    'no-useless-constructor': 'error',
    'no-useless-escape': 'off',
    'no-useless-return': 'error',
    'node/prefer-global/process': 'off',
    'prefer-const': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'unicorn/number-literal-case': 'error',
    'unused-imports/no-unused-vars': 'off',
    '@stylistic/operator-linebreak': ['error', 'before'],
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
    html: true,
  },
})
