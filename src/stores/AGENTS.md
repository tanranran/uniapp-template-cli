# src/stores — Pinia 状态管理

Setup Store 写法 + 持久化。所有 store 自动导入，全局可用。

## STRUCTURE

```
stores/
├── index.ts       # Pinia 实例 + setupStore(app) + 持久化配置
├── useToken.ts    # 认证核心: token / login / wxLogin / logout / hasLogin
├── user.ts        # 用户信息: userInfo / fetchUserInfo / clearUserInfo
└── theme.ts       # 主题管理: theme (light/dark) / themeVars / setTheme
```

## KEY DETAILS

### useToken (认证核心)
- **状态**: `tokenInfo { token, expiresIn }`
- **过期检测**: `hasLogin()` = token 存在 + 未过期（基于 `accessTokenExpireTime` storage）
- **登录**: `login(form)` → API → `setTokenInfo` → `fetchUserInfo`
- **微信登录**: `wxLogin()` → `getWxCode()` → API → 同上
- **登出**: 清除 token + storage + userInfo
- **持久化**: `persist: true`

### user
- **状态**: `userInfo { avatar, nickname, userId, username }`
- **持久化**: `persist: true`

### theme
- **状态**: `theme` (light/dark)，`themeVars` (暗色模式 CSS 变量)
- **系统跟随**: `uni.onThemeChange` 自动同步

## CONVENTIONS

- **Setup Store 写法**: 用函数式 `defineStore('name', () => { ... })` 而非选项式
- **持久化**: 添加 `{ persist: true }` — 底层用 `uni.getStorageSync/setStorageSync`
- **初始化顺序**: `setActivePinia(store)` 在 `app.use(store)` 之前调用（解决 APP 端白屏）

## ANTI-PATTERNS

- **不要在 computed 里调用异步函数**（见 useToken.getValidToken 注释）
- **不要在 store 外直接操作 storage**（统一走 Pinia 持久化）
