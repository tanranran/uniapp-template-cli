<h1 align="center">
  <a href="https://github.com/tanranran/uniapp-template-cli" target="_blank">自用  uniapp 开发模板</a>
</h1>


由 `uniapp` + `Vue3` + `Ts` + `Vite6` + `UnoCss` 构成，使用了最新的前端技术栈，无需依靠 `HBuilderX`，通过命令行方式运行 `web`、`小程序` 和 `App`（编辑器推荐 `WebStorm`，可选 `VSCode`）。

## 平台兼容性

| H5 | IOS | 安卓 | 微信小程序 | 字节小程序 | 快手小程序 | 支付宝小程序 | 钉钉小程序 | 百度小程序 |
|----|-----|----|-------|-------|-------|--------|-------|-------|
| √  | √   | √  | √     | √     | √     | √      | √     | √     |

## ⚙️ 环境

- node>=22
- pnpm>=10.12.4
- Vue Official>=2.1.10
- TypeScript>=5.9

## &#x1F4C2; 快速开始

执行 `pnpm i` 安装依赖
执行 `pnpm dev` 运行 `H5`
执行 `pnpm dev:mp` 运行 `微信小程序`

## 📦 运行（支持热更新）

- web平台： `pnpm dev:h5`, 然后打开即可。
- weixin平台：`pnpm dev:mp` 然后打开微信开发者工具，导入本地文件夹，选择本项目的`dist/dev/mp-weixin` 文件。
- APP平台：`pnpm dev:app`, 然后打开 `HBuilderX`，导入刚刚生成的`dist/dev/app` 文件夹，选择运行到模拟器(开发时优先使用)，或者运行的安卓/ios基座。

## 🔗 发布

- web平台： `pnpm build:h5`，打包后的文件在 `dist/build/h5`，可以放到web服务器，如nginx运行。如果最终不是放在根目录，可以在 `manifest.config.ts` 文件的 `h5.router.base` 属性进行修改。
- weixin平台：`pnpm build:mp`, 打包后的文件在 `dist/build/mp-weixin`，然后通过微信开发者工具导入，并点击右上角的“上传”按钮进行上传。
- APP平台：`pnpm build:app`, 然后打开 `HBuilderX`，导入刚刚生成的`dist/build/app` 文件夹，选择发行 - APP云打包。

## 技术栈

- [Vue 3](https://v3.cn.vuejs.org/) - 渐进式 JavaScript 框架
- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集，提供类型安全
- [Vite](https://cn.vitejs.dev/) - 新一代前端构建工具，极速的开发体验

### 状态管理

- [Pinia](https://pinia.vuejs.org/) - Vue 的轻量级状态管理库
- [pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/) - Pinia 持久化存储插件

### UI 和样式

- [UnoCSS](https://unocss.dev/) - 即时按需的原子 CSS 引擎
- [Wot UI](https://wot-ui.cn/) - 自定义移动端 UI 组件库
- [Sass](https://sass.nodejs.cn/) - CSS 扩展语言

### 开发工具

- [ESLint](https://eslint.org/) - JavaScript/TypeScript 代码质量检查工具
- [Prettier](https://prettier.io/) - 代码格式化工具
- [Husky](https://typicode.github.io/husky/) +
  [Lint-staged](https://github.com/okonet/lint-staged) - Git 提交钩子
- [Commitizen](https://github.com/commitizen/cz-cli) + [Commitlint](https://commitlint.js.org/) -
  Git 提交规范工具

## 模板目录结构

```
uniapp-template-cli/
├── env/                      # 环境变量配置
├── public/                   # 静态资源
├── src/                      # 源代码
│   ├── api/                  # 接口请求
│   ├── static/               # 静态资源
│   ├── components/           # 全局组件
│   ├── composables/          # 全局可组合函数
│   ├── enums/                # 枚举常量
│   ├── hooks/                # 自定义 Hooks
│   ├── layout/               # 布局组件
│   ├── router/               # 路由配置
│   ├── store/                # 状态管理
│   ├── styles/               # 全局样式
│   ├── utils/                # 工具函数
│   ├── types/                # 类型定义
│   ├── views/                # 页面视图
│   ├── App.vue               # 根组件
│   └── main.ts               # 入口文件
├── vite-plugins/             # Vite插件
├── index.html                # HTML 模板
├── manifest.config.ts        # 应用的配置文件
├── pages.config.ts           # 页面配置文件
├── tsconfig.json             # TypeScript 配置
├── uno.config.ts             # UnoCSS 配置
├── uno-color-mapping.ts      # UnoCSS 日夜间颜色映射
└── vite.config.ts            # Vite 配置
```
