# PROJECT KNOWLEDGE BASE

**Generated:** 2026-03-03
**Commit:** 956b16b
**Branch:** main

## OVERVIEW

UniApp + Vue 3 + TypeScript + Vite 5 + UnoCSS 跨平台移动应用模板。CLI 模式开发，支持 H5/微信小程序/App 等多端发布。

## STRUCTURE

```
.
├── src/
│   ├── api/              # API 接口 + 类型
│   ├── components/       # 全局组件 (common/ business/ layout/)
│   ├── composables/      # 组合式函数 (实际多为 Pinia Store)
│   ├── http/             # HTTP 请求类 + 拦截器
│   ├── pages/            # 主包页面
│   ├── pages-sub/        # 分包页面 (登录/404/webview 等)
│   ├── router/           # 路由拦截 + 导航封装
│   ├── stores/           # Pinia 状态管理
│   ├── styles/           # 全局 SCSS
│   ├── types/            # TS 类型 (多为自动生成，勿手动编辑)
│   ├── utils/            # 工具函数集
│   ├── App.vue           # 生命周期钩子
│   ├── App.ku.vue        # 实际根模板 (@uni-ku/root)
│   └── main.ts           # 入口: setupStore → setupRoute → setupHttp
├── vite-plugins/         # 3 个自定义 Vite 插件
├── env/                  # 环境变量 (.env / .env.development / .env.production)
├── scripts/              # 微信小程序上传脚本
├── pages.config.ts       # 页面路由配置 → 自动生成 pages.json
├── manifest.config.ts    # 应用清单配置 → 自动生成 manifest.json
├── vite.config.ts        # 构建配置 (14 个插件)
├── uno.config.ts         # UnoCSS 原子化样式
└── uno-color-mapping.ts  # 暗色模式颜色映射
```

## WHERE TO LOOK

| 任务 | 位置 | 备注 |
|------|------|------|
| 添加页面 | `src/pages/` 或 `src/pages-sub/` | 用 `definePage()` 宏配置路由 |
| 添加 API | `src/api/` + `src/api/types/` | 用 `Apis.http.get/post` 调用 |
| 添加组件 | `src/components/{common,business,layout}/` | 自动注册，无需导入 |
| 添加 Store | `src/stores/` | Setup Store 写法 + `persist: true` |
| 添加 Composable | `src/composables/` | 自动导入，全局可用 |
| 添加工具函数 | `src/utils/` 对应分类文件 | 自动导入，全局可用 |
| 修改路由拦截 | `src/router/interceptor.ts` | 基于 `needLogin` 元数据控制 |
| 修改请求拦截 | `src/http/interceptor.ts` | Token 注入 / Loading 管理 |
| 修改主题 | `src/composables/useTheme.ts` + `src/stores/theme.ts` | 暗色模式映射在 `uno-color-mapping.ts` |
| 修改环境变量 | `env/.env*` | 修改后需重启 dev server |
| 修改构建 | `vite.config.ts` | 14 个插件有序排列 |
| 微信上传 | `pnpm upload:mp` | 需配置私钥和 IP 白名单 |

## CODE MAP

### 初始化链

```
main.ts → createSSRApp(App)
        → setupStore(app)     // Pinia + 持久化 (uni.getStorageSync)
        → setupRoute(app)     // uni.addInterceptor 拦截所有导航
        → setupHttp(app)      // Request 类 + 拦截器
```

### 双根组件模式（⚠️ 非标准）

```
App.vue       → 仅生命周期钩子 (onLaunch/onShow/onHide/onError)
App.ku.vue    → 实际模板根 (由 @uni-ku/root 处理)
              → wd-config-provider (主题)
              → ku-root-view (页面插槽)
              → global-loading / global-toast / global-message
              → privacy-popup (仅微信小程序)
```

### 模块边界 (index.ts 导出)

| 模块 | 导出 |
|------|------|
| `stores/index` | `setupStore(app)`, Pinia 实例 |
| `router/index` | `setupRoute(app)`, `getCurrentPath()`, `currRoute()`, `parseUrlToObj()`, `getAllPages(key?)` |
| `http/index` | `Request` 类, `httpInstance`, `setupHttp(app)` |
| `utils/index` | `generateUUID()`, `debounce()`, `throttle()` |

## CONVENTIONS

### 组件块顺序（强制）

```
<script lang="ts" setup>  ← 第一
<template>                 ← 第二
<style lang="scss" scoped> ← 第三
```

### 代码风格

- 无分号 / 单引号 / 无尾随逗号 / 行宽 200
- 类型导入必须用 `import type` (`verbatimModuleSyntax`)
- Props/Emits 用 TypeScript 类型定义，非运行时声明
- 组件名 PascalCase / 事件名 camelCase

### 自动导入范围

Vue API / Pinia API / UniApp API / wot-design-uni / z-paging 类型 + `src/{composables,stores,utils,hooks,router}/**` — 全部全局可用，无需 import。

### 路由配置

页面用 `definePage()` 宏而非 `<route>` 块：
```typescript
definePage({
  style: { navigationBarTitleText: '标题' },
  needLogin: true  // 触发路由拦截器登录检查
})
```

### Store 模式

`composables/` 下的 `useGlobal*.ts` 实际是 `defineStore`，不是纯 Composable。这是本项目的约定。

## ANTI-PATTERNS (THIS PROJECT)

- **禁止手动编辑自动生成文件**: `pages.json`, `manifest.json`, `src/types/{auto-import,components,uni-pages,async-component,async-import}.d.ts`
- **禁止隐式 any**: `noImplicitAny: true` + `strict: true`
- **禁止非空断言**: `@typescript-eslint/no-non-null-assertion: error`
- **禁止 var 声明**: ESLint 强制
- **禁止 v-html**: 有 XSS 风险 (warn 级别)
- **禁止 switch case 穿透**: `noFallthroughCasesInSwitch`
- **避免 console**: 生产构建自动移除 (由 `VITE_DELETE_CONSOLE` 控制)

## UNIQUE STYLES

- **环境变量在 `env/` 目录**而非根目录
- **Composables 即 Stores**: `useGlobalLoading` 等用 `defineStore` 实现
- **全局 UI 通过 Pinia 驱动**: Loading/Toast/Message 由 Store 状态控制，在 `App.ku.vue` 渲染
- **版本号格式**: `YYYYMMDDNN`（非 semver）
- **路由防重复**: 300ms 内相同路由自动拦截 + globalData 锁
- **条件编译**: `#ifdef H5` / `#ifdef MP-WEIXIN` / `#ifdef MP-ALIPAY` 处理平台差异
- **异步分包组件**: `import X from '@/pages-sub/components/X.vue?async'`
- **强制 pnpm**: `preinstall` 钩子拒绝其他包管理器

## COMMANDS

```bash
# 开发
pnpm dev:h5                    # H5
pnpm dev:mp-weixin             # 微信小程序 (自动打开开发者工具)
pnpm dev:app                   # App

# 构建
pnpm build:h5                  # → dist/build/h5
pnpm build:mp-weixin           # → dist/build/mp-weixin

# 代码质量
pnpm type-check                # vue-tsc --noEmit
pnpm lint:fix                  # prettier + eslint --fix
pnpm format                    # prettier --write

# 部署
pnpm upload:mp                 # 微信小程序自动上传
pnpm upload:mp --version=1.0.1 --desc="修复bug"
```

## NOTES

- **无测试**: 项目没有测试框架和测试文件
- **无 CI/CD**: 无 GitHub Actions / Git Hooks
- **Node >= 22 + pnpm >= 10.12.4** 硬性要求
- **Token 过期检测**: `useToken().hasLogin()` 同时检查 token 存在 + 未过期
- **HTTP 重复请求**: 自动取消前一个相同请求（基于 method + url + data hash）
- **支付宝小程序**: Toast 组件需要 `hackAlipayVisible` 特殊处理
- **空目录**: `src/layout/`, `src/views/`, `src/static/` 是预留目录，被 vite.config.ts 引用
