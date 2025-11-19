import { useTokenStore } from '@/store/useTokenStore.ts'
import { type RequestConfig, type RequestInterceptor, type RequestMeta, type RequestOptions, ResponseData, type ResponseResult } from '@/http/types.ts'
import { parse } from '@/utils/json.ts'

// 请求基准地址
const baseUrl = import.meta.env.VITE_SERVER_BASEURL
// 队列请求数
let requestNum = 0
// 重复请求
const pendingRequests = new Map<string, RequestOptions>()

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
  request: (options: RequestOptions) => {
    const meta: RequestMeta = options.meta || {}
    const { url, method, data } = options
    const requestKey = `${method}_${url}_${stringify(data)}`
    // 存在相同请求则取消前一个
    if (pendingRequests.has(requestKey)) {
      const previousRequest = pendingRequests.get(requestKey)
      previousRequest?.cancel()
    }
    pendingRequests.set(requestKey, options)
    meta.requestKey = requestKey
    meta.loading && addLoading()
    const tokenStore = useTokenStore()
    const token = tokenStore.validToken
    if (token) {
      options.header.Authorization = `Bearer ${token}`
    }
    return options
  },
  // 响应拦截器
  response: async <T>(options: RequestOptions, response: ResponseResult) => {
    console.log('响应拦截器', response)
    const meta: RequestMeta = response.config?.meta || {}
    meta.loading && removeLoading()
    pendingRequests.delete(meta.requestKey ?? '')
    if (options.cancelFlag) {
      return new ResponseData<T>(-1, '取消请求')
    }
    const { statusCode, errMsg, data } = response
    const responseData = new ResponseData<T>()
    let responseMsg = ''
    let responseCode = -1
    if ([200, 401].indexOf(statusCode) > -1) {
      let dataObj = parse<any>(data)
      if (dataObj) {
        responseCode = dataObj?.errorCode ?? dataObj?.code ?? -1
        responseMsg = dataObj?.errorMsg ?? dataObj?.message ?? ''
        responseData.data = parse(dataObj?.data)
      }
    } else {
      responseMsg = handleNetworkError(statusCode, '')
    }
    responseData.code = responseCode
    responseData.msg = responseMsg
    responseData.request = options
    return responseData
  }
}

const handleNetworkError = (status: number, defaultMessage: string) => {
  if (defaultMessage) {
    return defaultMessage
  }
  let message = '未知错误'
  if (status) {
    switch (status) {
      case 400:
        message = '请求错误(400)'
        break
      case 401:
        message = '未授权，请重新登录(401)'
        break
      case 403:
        message = '拒绝访问(403)'
        break
      case 404:
        message = '请求出错(404)'
        break
      case 405:
        message = '方法不允许(405)'
        break
      case 408:
        message = '请求超时(408)'
        break
      case 500:
        message = '服务器错误(500)'
        break
      case 501:
        message = '服务未实现(501)'
        break
      case 502:
        message = '网络错误(502)'
        break
      case 503:
        message = '服务不可用(503)'
        break
      case 504:
        message = '网络超时(504)'
        break
      case 505:
        message = 'HTTP版本不受支持(505)'
        break
      default:
        message = `连接出错(${status})!`
    }
  } else {
    message = `无法连接到服务器！`
  }

  return message
}
