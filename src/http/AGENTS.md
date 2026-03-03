# src/http — HTTP 请求封装

基于类的 Request 封装，统一拦截 + 自动取消重复请求。

## STRUCTURE

```
http/
├── index.ts          # Request 类 + httpInstance 单例 + setupHttp(app)
├── interceptor.ts    # 请求/响应拦截器
├── types.ts          # RequestConfig, RequestOptions, ResponseData<T>, RequestMeta
└── tools/
    └── queryString.ts  # URL 参数序列化
```

## HOW IT WORKS

```
请求发起 → interceptor.request
         → 重复请求检测 (method+url+data hash)
         → 取消前一个相同请求
         → 注入 Authorization: Bearer {token}
         → meta.loading ? addLoading() : skip
         → uni.request(...)
         → interceptor.response
         → removeLoading
         → 解析 response → ResponseData<T>
```

## KEY PATTERNS

- **重复请求取消**: 基于 `${method}_${url}_${stringify(data)}` 生成 key，自动 cancel 前一个
- **Loading 队列**: 多个并发请求共享一个 loading，计数归零才关闭
- **H5 代理**: `#ifdef H5` 时检查 `VITE_APP_PROXY_ENABLE`，拼接 `VITE_APP_PROXY_PREFIX`
- **Token 注入**: 从 `useToken().validToken` 读取，过期不自动刷新

## CONVENTIONS

- 页面代码通过 `Apis.http.get/post` 发请求（不直接 import httpInstance）
- `meta.loading: true` 自动显示全局 Loading
- `meta.toast: true` 允许响应拦截器弹 toast
- `meta.originalData: true` 返回原始数据

## ANTI-PATTERNS

- **不要在拦截器里做异步 token 刷新**（当前架构不支持 refresh token 流程）
- **不要手动管理 loading**（拦截器自动处理）
