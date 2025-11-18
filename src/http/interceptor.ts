import { useTokenStore } from '@/store/useTokenStore.ts'
import { type RequestConfig, type RequestInterceptor, type RequestMeta, type RequestOptions, ResponseData, type ResponseResult } from '@/http/types.ts'

// 请求基准地址
const baseUrl = import.meta.env.VITE_SERVER_BASEURL
// 队列请求数
let requestNum = 0
// 重复请求
const pendingRequests = new Map<string, UniApp.RequestTask>()

const addLoading = () => {
  requestNum++
  if (requestNum === 1) {
    Apis.showLoading('加载中...')
  }
}

const removeLoading = () => {
  requestNum--
  if (requestNum === 0) {
    Apis.hideLoading()
  }
}

// 全局配置
export const httpRequestConfig: RequestConfig = {
  baseUrl,
  header: {
    'content-type': 'application/json'
  },
  timeout: 60000,
  meta: {
    originalData: true,
    toast: true,
    loading: true
  }
}

// 请求/响应拦截器
export const httpInterceptor: RequestInterceptor = {
  // 请求拦截器
  request: (config: RequestOptions) => {
    console.log('请求拦截器', config)
    const meta: RequestMeta = config.meta || {}
    const { url, method, data } = config
    const requestKey = `${method}_${url}_${JSON.stringify(data)}`
    // 存在相同请求则取消前一个
    if (pendingRequests.has(requestKey)) {
      // pendingRequests.get(requestKey)?.abort()
    }
    // pendingRequests.set(requestKey, method)
    meta.requestKey = requestKey
    meta.loading && addLoading()
    const tokenStore = useTokenStore()
    const token = tokenStore.validToken
    if (token) {
      config.header.Authorization = `Bearer ${token}`
    }
    return config
  },
  // 响应拦截器
  response: async <T>(response: ResponseResult) => {
    console.log('响应拦截器', response)
    const meta: RequestMeta = response.config?.meta || {}
    meta.loading && removeLoading()
    pendingRequests.delete(meta.requestKey ?? '')

    const { statusCode, errMsg, data } = response
    const responseData = new ResponseData<T>()
    let responseMsg = ''
    let responseCode = -1
    if ([200, 401].indexOf(statusCode) > -1) {
      if (typeof data == 'string') {
        responseCode = (data as any)?.errorCode ?? (data as any)?.code ?? -1
        responseMsg = (data as any)?.errorMsg ?? (data as any)?.message ?? ''
      }
    } else {
      responseMsg = handleNetworkError(statusCode, errMsg ?? '')
    }
    responseData.code = responseCode
    responseData.msg = responseMsg
    return responseData
  }
}

const handleNetworkError = (status: number, message: string) => {
  let errMessage = '未知错误'
  if (status) {
    switch (status) {
      case 400:
        errMessage = message || '错误的请求'
        break
      case 401:
        errMessage = message || '未授权，请重新登录'
        break
      case 403:
        errMessage = message || '拒绝访问'
        break
      case 404:
        errMessage = message || '请求错误,未找到该资源'
        break
      case 405:
        errMessage = message || '请求方法未允许'
        break
      case 408:
        errMessage = message || '请求超时'
        break
      case 500:
        errMessage = message || '服务器端出错'
        break
      case 501:
        errMessage = message || '网络未实现'
        break
      case 502:
        errMessage = message || '网络错误'
        break
      case 503:
        errMessage = message || '服务不可用'
        break
      case 504:
        errMessage = message || '网络超时'
        break
      case 505:
        errMessage = message || 'http版本不支持该请求'
        break
      default:
        errMessage = message || `其他连接错误 --${status}`
    }
  } else {
    errMessage = message || `无法连接到服务器！`
  }

  return errMessage
}
