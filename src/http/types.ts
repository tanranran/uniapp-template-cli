/**
 * 请求配置项Meta类型定义
 */
export interface RequestMeta {
  //是否显示loading
  loading?: boolean
  // 请求唯一标识
  requestKey?: string
  [key: string]: any
}

/**
 * 请求配置项类型定义
 */
export interface RequestConfig {
  baseUrl?: string
  header?: Record<string, any>
  method?: string
  dataType?: string
  responseType?: string
  timeout: number
  meta?: RequestMeta
}

/**
 * 请求参数类型定义
 */
export interface RequestOptions extends UniApp.RequestOptions {
  url: string
  header: Record<string, any>
  params?: Record<string, any>
  complete?: (response: any) => void
  meta?: RequestMeta
  task?: UniApp.RequestTask
}

/**
 * 请求拦截器类型定义
 */
export interface RequestInterceptor {
  request?: (options: RequestOptions) => RequestOptions
  response?: <T = any>(response: ResponseResult) => Promise<ResponseData<T>>
}

export interface ResponseResult extends UniApp.RequestSuccessCallbackResult {
  config: RequestOptions
  errMsg?: string
}
export class ResponseData<T> {
  code: number = 0
  msg: string = ''
  data?: T

  isOK() {
    return this.code === 0
  }
}
type IResponse<T = any> =
  | {
      code: number
      data: T
      message: string
      [key: string]: any // 允许额外属性
    }
  | {
      code: number
      data: T
      msg: string
      [key: string]: any // 允许额外属性
    }

// 分页请求参数
export interface PageParams {
  page: number
  pageSize: number
  [key: string]: any
}

// 分页响应数据
export interface PageResult<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}
