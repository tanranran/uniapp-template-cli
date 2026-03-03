# vite-plugins — 自定义 Vite 插件

3 个项目专用构建插件，在 `vite.config.ts` 中按顺序加载。

## STRUCTURE

```
vite-plugins/
├── vite-plugin-auto-version.ts    # 自动版本管理
├── vite-config-uni-pages.ts       # 页面路由名称生成
└── vite-open-dev-tools.ts         # 自动打开小程序开发者工具
```

## DETAILS

### vite-plugin-auto-version.ts
- 构建时自动递增版本号（格式: `YYYYMMDDNN`）
- 注入 Git hash + 构建时间到 `package.json`
- 占位符: `__APP_VERSION__`, `__APP_BUILD_DATE__`, `__APP_GIT_HASH__`

### vite-config-uni-pages.ts
- 自动生成路由名称常量: `pages/home/index.vue` → `PAGES_HOME_INDEX`
- 可选生成 `src/router/pageConst.ts`（路径常量文件）

### vite-open-dev-tools.ts
- macOS: 支持微信/支付宝/抖音开发者工具自动打开
- Windows: 支持微信开发者工具
- 通过 `SKIP_OPEN_DEVTOOLS=true` 环境变量禁用
