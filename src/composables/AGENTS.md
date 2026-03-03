# src/composables — 组合式函数（含 Pinia Store）

⚠️ 本项目的 composables 大部分是 `defineStore`，不是纯 Composable。这是有意为之的约定。

## STRUCTURE

```
composables/
├── useGlobalLoading.ts   # Pinia Store — 全局 Loading 状态
├── useGlobalToast.ts     # Pinia Store — 全局 Toast 提示
├── useGlobalMessage.ts   # Pinia Store — 全局消息弹窗 (alert/confirm/prompt)
├── useGlobalPage.ts      # Pinia Store — 页面级 ref 管理 (BaseLayout + z-paging)
├── useScroll.ts          # 纯 Composable — 列表滚动加载 (分页/loading/finished/error)
├── useTheme.ts           # 纯 Composable — 主题管理 (读取 themeStore + 监听系统变化)
└── types/
    └── theme.ts          # 主题类型定义
```

## KEY PATTERNS

### 全局 UI 组件通过 Store 驱动

```
useGlobalLoading().loading('加载中...')  →  GlobalLoading.vue 响应状态
useGlobalToast().success('成功')        →  GlobalToast.vue 响应状态
useGlobalMessage().confirm({...})       →  GlobalMessage.vue 响应状态
```

这些 Store 状态在 `App.ku.vue` 中被渲染，实现跨页面 UI。

### 页面匹配机制

全局 UI 组件通过 `currentPage` / `currentPath` 比较，确保只在发起页面上显示。

## CONVENTIONS

- **命名**: `useGlobal*.ts` = Pinia Store，其余为纯 Composable
- **新增全局 UI**: 创建 Store → 创建组件 → 在 `App.ku.vue` 注册
- **新增业务 Hook**: 参考 `useScroll.ts` 的纯函数模式

## ANTI-PATTERNS

- **不要把 `useGlobal*` 当普通 composable 理解**（它们是单例 Store）
- **不要在 composable 里直接操作 DOM**（UniApp 多端不支持）
