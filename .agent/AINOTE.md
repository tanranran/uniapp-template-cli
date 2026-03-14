# AI Agent 工作笔记

> 本文档记录 AI Agent 在此代码库工作过程中的发现和经验，对后续 Agent 工作具有指导意义。

## 项目特性

- 本项目使用 CLI 模式开发 UniApp，无需 HBuilderX
- 使用 `pnpm` 作为包管理器，`preinstall` 脚本强制限制
- 自动导入（auto-import）覆盖面广：Vue API、Pinia、UniApp、composables、stores、utils、router 均可直接使用
- `src/pages.json` 和 `src/manifest.json` 由 Vite 插件自动生成，不要手动编辑

## 开发注意事项

- 页面路由通过 `<route lang="json">` 块在 `.vue` 文件中定义，由 `@uni-helper/vite-plugin-uni-pages` 自动收集
- `getAllPages()` 返回的 `path` 不带 `/` 前缀（如 `pages/index/index`），而路由拦截器中的 path 带 `/` 前缀
- HTTP 请求封装在 `src/http/` 中，支持 `meta.loading`、`meta.toast`、`meta.originalData` 控制行为
- 主题跟随系统，通过 `theme.json` + CSS 变量实现暗色模式

## 已知限制

- 当前不支持 refresh token 机制，token 过期后需要重新登录
- 小程序端有 2MB 单包限制，使用分包策略
