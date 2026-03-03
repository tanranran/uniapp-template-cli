# src/router — 路由拦截与导航

基于 `uni.addInterceptor` 的路由拦截体系 + 防重复跳转。

## STRUCTURE

```
router/
├── index.ts          # 导出: setupRoute, getCurrentPath, currRoute, parseUrlToObj, getAllPages
├── interceptor.ts    # 路由拦截器: 登录检查 + 页面存在检查 + 相对路径处理
└── router.ts         # 路由对象: push/home/login/notFound + 常量 (HOME_PAGE/LOGIN_PAGE/NOT_FOUND_PAGE)
```

## HOW IT WORKS

```
任意导航 (navigateTo/reLaunch/redirectTo/switchTab)
  → navigateToInterceptor.invoke
  → 解析 URL → path + query
  → 处理相对路径 (非 / 开头)
  → 检查页面是否存在 → 不存在则 router.notFound()
  → useToken().hasLogin() ?
     ├─ 已登录 + 目标是登录页 → 跳转 redirect 或首页
     ├─ 已登录 + 目标不是登录页 → 放行
     └─ 未登录 + needLogin 页面 → router.login(?redirect=...)
```

## KEY PATTERNS

- **黑名单策略**: 页面通过 `definePage({ needLogin: true })` 标记需要登录
- **HOME_PAGE**: 从 `pages.json` 自动读取 `type: 'home'` 的页面路径
- **防重复跳转**: `router.ts` 中 300ms 内相同 URL 自动拦截
- **全局锁**: `getApp().globalData.__router_lock__` 防止并发跳转
- **URL 解析**: `parseUrlToObj` 从 fullPath 拆出 path + decoded query

## CONVENTIONS

- **用 `router.push(url)` 代替 `uni.navigateTo`**（带防重复 + 锁机制）
- **`getAllPages(key)` 支持按 meta 字段过滤**（如 `getAllPages('needLogin')`）
- 路由常量在 `router.ts` 中定义，不要硬编码路径字符串

## ANTI-PATTERNS

- **不要手动调 `uni.navigateTo`**（绕过防重复和拦截器）
- **不要在拦截器里执行异步操作**（可能导致竞态条件）
