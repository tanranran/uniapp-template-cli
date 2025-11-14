import type { CustomRequestOptions, IResponse } from '@/utils/http/types.ts'

class Http {
  /**
   * GET 请求
   * @param url 后台地址
   * @param query 请求query参数
   * @param header 请求头，默认为json格式
   * @param options
   * @returns
   */
  get<T>(url: string, query?: Record<string, any>, header?: Record<string, any>, options?: Partial<CustomRequestOptions>) {
    return this.request<T>({
      url,
      query,
      method: 'GET',
      header,
      ...options
    })
  }

  /**
   * POST 请求
   * @param url 后台地址
   * @param data 请求body参数
   * @param query 请求query参数，post请求也支持query，很多微信接口都需要
   * @param header 请求头，默认为json格式
   * @param options
   * @returns
   */
  post<T>(url: string, data?: Record<string, any>, query?: Record<string, any>, header?: Record<string, any>, options?: Partial<CustomRequestOptions>) {
    return this.request<T>({
      url,
      query,
      data,
      method: 'POST',
      header,
      ...options
    })
  }

  request<T>(options: CustomRequestOptions) {
    return new Promise<IResponse<T>>((resolve, reject) => {
      uni.request({
        ...options,
        dataType: 'json',
        // #ifndef MP-WEIXIN
        responseType: 'json',
        // #endif
        // 响应成功
        success: async res => {
          // const responseData = res.data as IResponse<T>
          // const httpCode = res.statusCode
          // const { code } = responseData
          // return resolve(responseData.data)

          this.handleResponse(res, resolve)
        },
        // 响应失败
        fail: err => {
          this.handleResponse(err, resolve)
        }
      })
    })
  }

  handleResponse<T>(res: any, resolve: (value: IResponse<T>) => void) {
    console.log('res', res)
    resolve(res)
  }
}
