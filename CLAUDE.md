# CLAUDE.md - UniApp 开发模板项目指南

> 本文档为 Claude Code 助手提供项目上下文，包含架构说明、开发规范和常用命令。

---

## 项目概述

这是一个基于 **UniApp + Vue 3 + TypeScript + Vite 5 + UnoCSS** 的跨平台移动应用开发模板，支持 H5、微信小程序、App 等多端发布。采用 CLI 模式开发，无需依赖 HBuilderX。

### 平台兼容性

| H5 | iOS | Android | 微信小程序 | 支付宝小程序 | 字节小程序 | 快手小程序 | 百度小程序 |
|:--:|:---:|:-------:|:-----:|:------:|:-----:|:-----:|:-----:|
| ✓  |  ✓  |    ✓    |   ✓   |   ✓    |   ✓   |   ✓   |   ✓   |

---

## 技术栈

### 核心框架

| 技术         | 版本          | 说明                  |
|------------|-------------|---------------------|
| Vue        | ^3.4.21     | 渐进式 JavaScript 框架   |
| TypeScript | ^5.9.3      | 类型安全的 JavaScript 超集 |
| Vite       | ^5.2.8      | 新一代前端构建工具           |
| UniApp     | 3.0.0-alpha | 跨平台应用开发框架           |

### 状态管理

- **Pinia** 3.0.3 - Vue 官方状态管理库
- **pinia-plugin-persistedstate** - 状态持久化插件

### UI & 样式

- **UnoCSS** - 即时按需原子化 CSS 引擎
- **wot-design-uni** - 移动端 UI 组件库
- **Sass** - CSS 预处理器
- **z-paging** - 分页滚动组件

### 工具链

- **ESLint** 9 + **Prettier** - 代码规范和格式化
- **unplugin-auto-import** - 自动导入 API
- **@uni-helper 系列** - UniApp 增强工具

---

## 目录结构

```
uniapp-template-cli/
├── .agent/                    # Agent 规则配置
├── .husky/                    # Git 提交钩子
├── .vscode/                   # VSCode 配置
├── env/                       # 环境变量配置
│   ├── .env                   # 默认环境变量
│   ├── .env.development       # 开发环境变量
│   └── .env.production        # 生产环境变量
├── public/                    # 静态资源
├── src/                       # 源代码目录
│   ├── api/                   # API 接口定义
│   │   ├── login.ts           # 登录相关接口
│   │   └── types/             # 接口类型定义
│   ├── components/            # 公共组件
│   │   ├── common/            # 通用基础组件
│   │   ├── business/          # 业务组件
│   │   └── layout/            # 布局组件
│   ├── composables/           # 组合式函数 (Hooks)
│   ├── http/                  # 网络请求封装
│   ├── pages/                 # 主包页面
│   ├── pages-sub/             # 分包页面
│   ├── router/                # 路由配置
│   │   ├── index.ts           # 路由工具
│   │   ├── interceptor.ts     # 路由拦截器
│   │   └── router.ts          # 路由集合
│   ├── stores/                # Pinia 状态管理
│   │   ├── index.ts           # Store 入口
│   │   ├── user.ts            # 用户状态
│   │   ├── theme.ts           # 主题状态
│   │   └── useToken.ts        # Token 管理
│   ├── styles/                # 全局样式
│   ├── types/                 # TypeScript 类型定义
│   ├── utils/                 # 工具函数
│   ├── App.vue                # 根组件
│   └── main.ts                # 应用入口
├── vite-plugins/              # 自定义 Vite 插件
├── eslint.config.mjs          # ESLint 配置
├── manifest.config.ts         # UniApp 应用配置
├── pages.config.ts            # 页面路由配置
├── tsconfig.json              # TypeScript 配置
├── uno.config.ts              # UnoCSS 配置
├── uno-color-mapping.ts       # UnoCSS 暗色模式映射
├── vite.config.ts             # Vite 配置
└── package.json               # 项目配置
```

---

## 环境要求

| 依赖                    | 版本要求       |
|-----------------------|------------|
| Node.js               | >= 22      |
| pnpm                  | >= 10.12.4 |
| Vue Official (VSCode) | >= 2.1.10  |
| TypeScript            | >= 5.9     |

---

## 常用命令

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
# H5 开发
pnpm dev:h5

# 微信小程序开发
pnpm dev:mp
# 或
pnpm dev:mp-weixin

# App 开发
pnpm dev:app

# 生产环境预览
pnpm dev:h5:production
pnpm dev:mp-weixin:production
```

### 构建打包

```bash
# H5 打包
pnpm build:h5

# 微信小程序打包
pnpm build:mp-weixin

# App 打包
pnpm build:app
```

### 代码质量

```bash
# 类型检查
pnpm type-check

# 代码格式化
pnpm format

# 代码检查
pnpm lint

# 代码检查并自动修复
pnpm lint:fix
```

### UniApp 版本管理

```bash
pnpm uvm
```

---

## 代码规范

### Vue 组件规范

#### 组件块顺序

```vue

<script lang="ts" setup>
  // 1. script 在前
</script>

<template>
  <!-- 2. template 在中 -->
</template>

<style lang="scss" scoped>
  /* 3. style 在后 */
</style>
```

#### 组件命名

- 组件名使用 PascalCase：`<MyComponent />`
- 自定义事件使用 camelCase：`@updateUser`
- 忽略多词检查的组件：`index`, `404`, `App`, `login`, `paging`

#### Props 和 Emits

```typescript
// 使用类型定义 Props
interface Props {
    title: string
    count?: number
}

const props = defineProps<Props>()

// 使用类型定义 Emits
interface Emits {
    (e: 'update', value: number): void

    (e: 'close'): void
}

const emit = defineEmits<Emits>()
```

### TypeScript 规范

#### 类型导入

```typescript
// 使用 type 关键字导入类型
import type {Ref} from 'vue'

// 混合导入
import {ref, computed, type ComputedRef} from 'vue'
```

#### 禁止使用的模式

- 禁止 `var` 声明
- 禁止隐式 `any`
- 禁止非空断言后可选链 `obj!.prop?`
- 禁止重复声明

### 样式规范

#### UnoCSS 使用

```html
<!-- 布局快捷类 -->
<div class="flex-center">居中布局</div>
<div class="flex-col-center">垂直居中</div>
<div class="f-b">两端对齐</div>
<div class="f-c">居中</div>
<div class="f-s">左对齐</div>
<div class="f-e">右对齐</div>
<div class="wh-full">宽高100%</div>
<div class="absolute-full">绝对定位全屏</div>

<!-- 安全区适配 -->
<div class="pt-safe">顶部安全区</div>
<div class="pb-safe">底部安全区</div>
```

#### 主题色

```css
/* 使用主题色 */
color:
var

(
--wot-color-theme, #0957DE

)
;

/* UnoCSS 中使用 */
.text-primary {
    color: var(--wot-color-theme, #0957DE);
}
```

### 命名约定

| 类型       | 命名风格               | 示例                |
|----------|--------------------|-------------------|
| 组件文件     | PascalCase         | `UserProfile.vue` |
| 组合式函数    | camelCase + use 前缀 | `useToken.ts`     |
| 工具函数     | camelCase          | `formatDate.ts`   |
| 类型文件     | camelCase          | `user.d.ts`       |
| 常量       | UPPER_SNAKE_CASE   | `API_BASE_URL`    |
| Store 模块 | camelCase          | `useUserStore`    |

### 自动导入

以下 API 无需手动导入，可直接使用：

#### Vue API

```typescript
ref, reactive, computed, watch, onMounted, onUnmounted, watchEffect, nextTick, toRef, toRefs, unref, isRef
...
```

#### Pinia API

```typescript
defineStore, storeToRefs
...
```

#### UniApp API

```typescript
onLaunch, onShow, onHide, onLoad, onShow, onReady, uni
...
```

#### wot-design-uni

```typescript
useToast, useMessage, useNotify, CommonUtil
```

#### 项目内模块

```typescript
// composables/ 下的组合式函数
// stores/ 下的 Store
// utils/ 下的工具函数
// router/ 下的路由相关
```

---

## 路径别名

| 别名            | 路径                    |
|---------------|-----------------------|
| `@`           | `./src`               |
| `@img`        | `./src/static/images` |
| `@components` | `./src/components`    |
| `@layout`     | `./src/layout`        |
| `@utils`      | `./src/utils`         |

---

## 关键配置文件

### manifest.config.ts

应用配置文件，包含：

- 应用名称、版本
- App 图标配置
- 小程序 AppID
- H5 路由配置
- 权限声明

### pages.config.ts

页面配置文件，包含：

- 全局样式配置
- easycom 组件自动导入
- 分包预加载规则

### vite.config.ts

Vite 构建配置，包含：

- 插件配置
- 路径别名
- 开发服务器
- 构建优化（分包策略、压缩配置）

### env/.env

环境变量配置：

```bash
VITE_APP_TITLE=应用名称
VITE_UNI_APPID=__UNI__XXXXX
VITE_WX_APPID=wxXXXXX
VITE_SERVER_BASEURL=https://api.example.com
VITE_APP_PROXY_ENABLE=true
VITE_APP_PROXY_PREFIX=/api
```

---

## 开发流程

### 新增页面

1. 在 `src/pages/` 或 `src/pages-sub/` 创建 `.vue` 文件
2. 页面配置通过 `<route>` 块定义：

```vue

<route lang="json">
  {
  "style": {
  "navigationBarTitleText": "页面标题"
  },
  "needLogin": true
  }
</route>
```

### 新增 API 接口

1. 在 `src/api/` 下创建或编辑模块文件
2. 在 `src/api/types/` 下定义类型

```typescript
// src/api/user.ts
import type {UserInfo} from './types/user'
import {http} from '@/http'

export function getUserInfo() {
    return http.get<UserInfo>('/user/info')
}
```

### 新增 Store

```typescript
// src/stores/user.ts
import {defineStore} from 'pinia'

interface UserState {
    info: UserInfo | null
}

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        info: null
    }),
    actions: {
        setInfo(info: UserInfo) {
            this.info = info
        }
    },
    persist: true // 开启持久化
})
```

### 新增组合式函数

```typescript
// src/composables/useCounter.ts
import {ref, computed} from 'vue'

export function useCounter(initial = 0) {
    const count = ref(initial)
    const double = computed(() => count.value * 2)

    function increment() {
        count.value++
    }

    return {count, double, increment}
}
```

---

## 构建输出

| 平台    | 开发输出                 | 构建输出                   |
|-------|----------------------|------------------------|
| H5    | 内存                   | `dist/build/h5`        |
| 微信小程序 | `dist/dev/mp-weixin` | `dist/build/mp-weixin` |
| App   | `dist/dev/app`       | `dist/build/app`       |

---

## 注意事项

1. **环境变量**：修改 `env/.env` 后需重启开发服务器
2. **分包限制**：小程序单个分包不超过 2MB，总大小不超过 20MB
3. **自动生成文件**：以下文件由插件生成，不要手动编辑
    - `src/pages.json`
    - `src/manifest.json`
    - `src/types/auto-import.d.ts`
    - `src/types/components.d.ts`
    - `src/types/uni-pages.d.ts`

4. **控制台日志**：生产构建会自动移除 `console.log/warn/debug`
5. **图片压缩**：生产构建会自动压缩图片资源

---

## 调试技巧

### H5 调试

- 使用浏览器开发者工具
- Option+Shift 点击 DOM 可跳转到源码（code-inspector-plugin）

### 微信小程序调试

1. 运行 `pnpm dev:mp`
2. 打开微信开发者工具
3. 导入 `dist/dev/mp-weixin` 目录

### 微信开发者工具自动打开

修改 `env/.env` 中的 `VITE_WX_APPID`，开发时会自动打开微信开发者工具

---

## 相关文档

- [UniApp 官方文档](https://uniapp.dcloud.net.cn/)
- [Vue 3 文档](https://cn.vuejs.org/)
- [Pinia 文档](https://pinia.vuejs.org/zh/)
- [UnoCSS 文档](https://unocss.dev/)
- [wot-design-uni 文档](https://wot-ui.cn/)
- [z-paging 文档](https://z-paging.zxlee.cn/)

## 文档结构

.agent 文件夹包含以下内容：

- Tasks: 每个功能的 PRD（产品需求文档）和实现计划
- System: 记录系统当前状态（项目结构、技术栈、集成点、数据库结构，以及核心功能，如 agent 架构、LLM 层等）
- SOP: 执行特定任务的最佳实践（例如如何添加数据库迁移、如何添加新页面路由等）
- README.md: 所有文档的索引，方便团队成员了解有哪些文档、内容是什么、以及从哪里查看
- AINOTE.md：AI Agents 将会在此代码库中工作时的发现，记录在此文档中，文档中的内容对 AI Agents 具有指导意义。如在此代码库的工作中发现任何可记录的内容，可以更新此文档。

## 规则

- 在你开始任何工作之前，必须先查看 @.claulde/tasks/context_session_{x}.md 文件，以获取完整上下文（其中 {x} 是我们当前操作的会话 ID，如果文件不存在，就创建一个）。
- context_session_{x}.md 文件应包含我们已完成工作的主要上下文、整体计划，子代理会持续往该文件里添加上下文。
- 在你完成工作之后，必须更新 @.claude/tasks/context_session_{x}.md 文件，确保其他人能够完整理解你所做的工作。

## 响应要求

- 除非特殊要求，否则使用中文撰写文档或回复。
- 每次回复时，要叫我爸爸。
