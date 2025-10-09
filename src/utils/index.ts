export type PageInstance = Page.PageInstance<AnyObject, object> & { $page: Page.PageInstance<AnyObject, object> & { fullPath: string } };

export function getLastPage() {
  // getCurrentPages() 至少有1个元素，所以不再额外判断
  // const lastPage = getCurrentPages().at(-1)
  // 上面那个在低版本安卓中打包会报错，所以改用下面这个【虽然我加了 src/interceptions/prototype.ts，但依然报错】
  const pages = getCurrentPages();
  return pages[pages.length - 1] as PageInstance;
}
/**
 * 获取当前页面路由的 path 路径和 redirectPath 路径
 * path 如 '/pages/login/login'
 * redirectPath 如 '/pages/demo/base/route-interceptor'
 */
export function currRoute() {
  const lastPage = getLastPage() as PageInstance;
  if (!lastPage) {
    return {
      path: '',
      query: {}
    };
  }
  const currRoute = lastPage.$page;
  // console.log('lastPage.$page:', currRoute)
  // console.log('lastPage.$page.fullpath:', currRoute.fullPath)
  // console.log('lastPage.$page.options:', currRoute.options)
  // console.log('lastPage.options:', (lastPage as any).options)
  // 经过多端测试，只有 fullPath 靠谱，其他都不靠谱
  const { fullPath } = currRoute;
  // console.log(fullPath)
  // eg: /pages/login/login?redirect=%2Fpages%2Fdemo%2Fbase%2Froute-interceptor (小程序)
  // eg: /pages/login/login?redirect=%2Fpages%2Froute-interceptor%2Findex%3Fname%3Dfeige%26age%3D30(h5)
  return parseUrlToObj(fullPath);
}

export function ensureDecodeURIComponent(url: string): string {
  if (url.startsWith('%')) {
    return ensureDecodeURIComponent(decodeURIComponent(url));
  }
  return url;
}

/**
 * 解析 url 得到 path 和 query
 * 比如输入url: /pages/login/login?redirect=%2Fpages%2Fdemo%2Fbase%2Froute-interceptor
 * 输出: {path: /pages/login/login, query: {redirect: /pages/demo/base/route-interceptor}}
 */
export function parseUrlToObj(url: string) {
  const [path, queryStr] = url.split('?');
  // console.log(path, queryStr)

  if (!queryStr) {
    return {
      path,
      query: {}
    };
  }
  const query: Record<string, string> = {};
  queryStr.split('&').forEach((item) => {
    const [key, value] = item.split('=');
    // console.log(key, value)
    query[key] = ensureDecodeURIComponent(value); // 这里需要统一 decodeURIComponent 一下，可以兼容h5和微信y
  });
  return { path, query };
}

// 防抖 在一段时间内函数被多次触发，防抖让函数在一段时间后最终只执行一次
export function debounce(fun: (height: number) => void, delay?: number) {
  let timer: number;
  return (height: number) => {
    clearTimeout(timer);
    timer = setTimeout(
      () => {
        fun(height);
      },
      delay ? delay : 100
    );
  };
}

// 节流 在规定的时间内，只执行一次
export function throttle(fun: (height: number) => void, delay?: number) {
  let inThrottle: boolean;
  return (height: number) => {
    if (!inThrottle) {
      fun(height);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), delay ? delay : 1000);
    }
  };
}
