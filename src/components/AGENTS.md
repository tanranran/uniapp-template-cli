# src/components — 全局组件

自动注册，无需 import。通过 `@uni-helper/vite-plugin-uni-components` 扫描。

## STRUCTURE

```
components/
├── common/                    # 通用基础组件
│   ├── GlobalLoading.vue      # 全局加载 — 由 useGlobalLoading store 驱动
│   ├── GlobalToast.vue        # 全局 Toast — 由 useGlobalToast store 驱动
│   └── GlobalMessage.vue      # 全局消息框 — 由 useGlobalMessage store 驱动
├── business/                  # 业务组件
│   └── PrivacyPopup.vue       # 隐私协议弹窗 — 仅微信小程序 (#ifdef MP-WEIXIN)
├── layout/                    # 布局组件
│   └── BaseLayout.vue         # 页面包装器 — 提供 loading/empty/error 状态管理
└── DemoBlock.vue              # 演示块 — 开发/文档用
```

## KEY PATTERNS

### BaseLayout 使用

```vue
<template>
  <base-layout ref="page">
    <view>页面内容</view>
  </base-layout>
</template>
```

暴露方法: `showLoading()` / `showEmpty()` / `showError(msg, callback)` / `showSuccess()`

### GlobalToast 平台适配

```vue
<!-- #ifndef MP-ALIPAY -->
<wd-toast selector="globalToast" />
<!-- #endif -->
<!-- #ifdef MP-ALIPAY -->
<wd-toast v-if="hackAlipayVisible" selector="globalToast" />
<!-- #endif -->
```

支付宝小程序需要 `hackAlipayVisible` 延迟渲染 hack。

## CONVENTIONS

- 所有组件设置 `options: { virtualHost: true, addGlobalClass: true, styleIsolation: 'shared' }`
- 组件命名 PascalCase，文件名与组件名一致
- UI 库: `wd-*` (wot-design-uni) + `z-paging`，通过 easycom 自动解析

## ANTI-PATTERNS

- **不要在 common/ 组件里引入业务逻辑**
- **不要手动注册组件**（自动导入已覆盖 src/components + src/layout）
