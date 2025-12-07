import type { IAuthLoginRes, ILoginForm, IUserInfoRes } from '@/api/types/login'
import { Apis } from '@/utils/Apis.ts'

/**
 * 用户登录
 * @param loginForm 登录表单
 */
export function login(loginForm: ILoginForm) {
  return Apis.http.post<IAuthLoginRes>('/auth/login', loginForm)
}

/**
 * 退出登录
 */
export function logout() {
  return Apis.http.get<void>('/auth/logout')
}

/**
 * 微信登录
 * @returns Promise 包含登录结果
 * @param data
 */
export function wxLogin(data: { code: string }) {
  return Apis.http.post<IAuthLoginRes>('/auth/wxLogin', data)
}

/**
 * 获取微信登录凭证
 * @returns Promise 包含微信登录凭证(code)
 */
export function getWxCode() {
  return new Promise<UniApp.LoginRes>((resolve, reject) => {
    uni.login({
      provider: 'weixin',
      success: (res) => resolve(res),
      fail: (err) => reject(new Error(err))
    })
  })
}

/**
 * 获取用户信息
 */
export function getUserInfo() {
  return Apis.http.get<IUserInfoRes>('/user/info')
}
