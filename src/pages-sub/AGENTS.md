# src/pages-sub — 分包页面

分包页面，独立加载以减小主包体积。首页通过 `preloadRule` 预加载此分包。

## STRUCTURE

```
pages-sub/
├── 404/
│   └── index.vue           # 404 页面 (navigationStyle: 'custom')
├── login/
│   └── login.vue           # 登录页 — 普通登录 + 微信登录
├── webview/
│   └── webView.vue         # WebView 容器 — 动态标题
├── styles/
│   └── index.vue           # UnoCSS 样式演示页
└── components/
    └── BarChart.vue        # 分包专用组件 (异步加载)
```

## KEY PATTERNS

### 异步组件跨包引用

主包页面引用分包组件:
```typescript
import BarChart from '@/pages-sub/components/BarChart.vue?async'
```
由 `@uni-ku/bundle-optimizer` 处理，无需手动配置。

### 预加载配置

在 `pages.config.ts` 中:
```typescript
preloadRule: {
  'pages/index/index': { network: 'all', packages: ['pages-sub'] }
}
```

## CONVENTIONS

- 非核心页面（登录/404/webview）统一放分包
- 分包内组件放 `components/`，用 `?async` 后缀跨包引用
- 分包内样式放 `styles/`
