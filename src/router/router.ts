import { pages } from '@/pages.json' with { type: 'json' }
import type { PageMetaDatum } from '@uni-helper/vite-plugin-uni-pages'
/**
 * 首页路径，通过 page.json 里面的 type 为 home 的页面获取，如果没有，则默认是第一个页面
 * 通常为 /pages/index/index
 */
export const HOME_PAGE = `/${(pages as PageMetaDatum[]).find(page => page.type === 'home')?.path || (pages as PageMetaDatum[])[0].path}`

export const LOGIN_PAGE: _LocationUrl = '/pages-sub/login/login'

export const NOT_FOUND_PAGE: _LocationUrl = '/pages-sub/404/index'

export default {
  push(options: UniNamespace.NavigateToOptions | _LocationUrl | string, isReplace: boolean = false) {
    const url = typeof options === 'string' ? options : options.url
    if (isReplace) {
      uni.redirectTo({
        url,
        ...(typeof options === 'object' ? options : {})
      })
    } else {
      uni.navigateTo({
        url,
        ...(typeof options === 'object' ? options : {})
      })
    }
  },
  showTestA() {
    this.push({
      url: '/pages/index/testA'
    })
  },
  showTestB() {
    this.push({
      url: '/pages/index/testB'
    })
  },
  /**
   * 查询参数
   * @example '?redirect=/pages/home/index'
   */
  login(queryString: string = '') {
    const url = `${LOGIN_PAGE}${queryString}`
    // 获取当前页面路径
    const currentPage = getLastPage()
    const currentPath = `/${currentPage.route}`
    // 如果已经在登录页，则不跳转
    if (currentPath === LOGIN_PAGE) {
      return
    }
    this.push({
      url: url
    })
  },
  notFound() {
    this.push({
      url: NOT_FOUND_PAGE
    })
  }
}
