# src/pages — 主包页面

主包页面，通过 `definePage()` 宏自动注册路由到 `pages.json`。

## STRUCTURE

```
pages/
└── index/
    ├── index.vue     # 首页 (type: 'home') — 功能导航入口
    ├── paging.vue    # z-paging 分页演示 (needLogin: true)
    ├── testA.vue     # 异步分包组件加载演示
    └── testB.vue     # 全局 Loading 演示
```

## CONVENTIONS

### 页面路由配置

```typescript
definePage({
  type: 'home',                              // 可选: 标记为首页
  style: { navigationBarTitleText: '标题' },  // 导航栏配置
  needLogin: true                             // 可选: 需要登录
})
```

### 路由名称生成规则

路径 → 替换 `/-.` 为 `_` → 大写。例: `pages/index/index` → `PAGES_INDEX_INDEX`

### 新增页面

1. 在 `src/pages/` 下创建 `.vue` 文件
2. 在 `<script setup>` 中调用 `definePage({...})`
3. 自动生成路由，无需手动注册

## ANTI-PATTERNS

- **不要手动编辑 `pages.json`**（由 `pages.config.ts` + `definePage()` 自动生成）
- **不要在主包放非核心页面**（用 `pages-sub/` 分包减小主包体积）
