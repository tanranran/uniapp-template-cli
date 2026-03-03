# src/utils — 工具函数集

14 个文件，按功能分类。全部通过 `unplugin-auto-import` 全局自动导入，无需 import。

## STRUCTURE

```
utils/
├── index.ts       # 导出: generateUUID, debounce, throttle
├── Apis.ts        # 内部入口: 暴露 httpInstance + UI 方法 (showLoading/hideLoading/showToast)
├── ui.ts          # UI 工具: showToast/showLoading 统一封装 (兼容 uni + wot-design)
├── date.ts        # 日期: 基于 dayjs，formatDate/formatTime/formatDateTime
├── json.ts        # JSON: parse/stringify (安全，带 try-catch)，isJSON
├── object.ts      # 对象: isEmpty/deepClone/getValue/setValue
├── number.ts      # 数字: isNumber/toInt/toFloat
├── string.ts      # 字符串: buildUrlWithParams
├── uuid.ts        # UUID v4: 优先 crypto → Math.random 兜底 (会 console.warn)
├── is.ts          # 类型守卫: isToastOptions/isShowLoadingOptions
├── platform.ts    # 平台检测: isH5/isApp/isMpWeixin/isMpAlipay 等
├── ref.ts         # Vue ref: useComponentRef<T>() 类型安全组件引用
├── script.ts      # 动态脚本: asyncLoadScript/removeScript (仅 H5)
└── type.ts        # 通用类型定义
```

## WHERE TO LOOK

| 需要 | 找 |
|------|---|
| HTTP 请求 | `Apis.http.get/post` — 不要直接 import httpInstance |
| 全局 loading | `Apis.showLoading()` / `Apis.hideLoading()` |
| 日期格式化 | `formatDate()`、`formatTime()` — 基于 dayjs |
| 深拷贝 | `deepClone()` — 在 object.ts |
| 平台判断 | `isH5()` / `isMpWeixin()` — 在 platform.ts |
| 组件 ref | `useComponentRef<WdButton>()` — 在 ref.ts |

## CONVENTIONS

- **新工具函数放对应分类文件**，不要新建文件（除非确实是新类别）
- **index.ts 只导出最常用的 3 个**（debounce/throttle/generateUUID），其余依赖自动导入
- `Apis.ts` 是内部封装层，页面/组件代码应通过 `Apis.http` 发请求
- `ui.ts` 统一了 uni.showToast 和 wot-design-uni 的 useToast，调用方无需关心底层

## ANTI-PATTERNS

- **不要在 utils 里 import 组件或 store**（避免循环依赖，`Apis.ts` 是唯一例外）
- **uuid.ts 的 Math.random 兜底不是密码安全的**，生产环境确保 crypto 可用
