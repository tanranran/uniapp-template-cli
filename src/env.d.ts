/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  /** 网站标题，应用名称 */
  readonly VITE_APP_TITLE: string;
  /** 服务端口号 */
  readonly VITE_SERVER_PORT: string;
  /** 后台接口地址 */
  readonly VITE_SERVER_BASEURL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const __UNI_PLATFORM__: 'app' | 'h5' | 'mp-alipay' | 'mp-baidu' | 'mp-kuaishou' | 'mp-lark' | 'mp-qq' | 'mp-tiktok' | 'mp-weixin' | 'mp-xiaochengxu';
declare const __APP_VERSION__: string;
declare const __APP_BUILD_DATE__: string;
declare const __APP_GIT_HASH__: string;
