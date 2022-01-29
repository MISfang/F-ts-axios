import { IAxiosPromise, IAxiosRequestConfig } from '../types'
import dispatchRequest from './dispatchRquest'

class FAxios {
  request(config: IAxiosRequestConfig): IAxiosPromise {
    return dispatchRequest(config)
  }

  // 辅助函数前四个不需要传参的方法的模板方法(get,delete,options,head)
  _requestMethodWithoutData(method: string, url: string, config?: IAxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }

  get(url: string, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }
  delete(url: string, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }
  head(url: string, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestMethodWithoutData('head', url, config)
  }
  options(url: string, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestMethodWithoutData('options', url, config)
  }
  // 前四个不需要data的方法

  // 辅助函数后三个需要传参的方法的模板方法(post,put,patch)
  _requestMethodWithData(method: string, url: string, data?: any, config?: IAxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }
  post(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }
  put(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }
  patch(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }
  // 后三个方法结束
}

export { FAxios }
