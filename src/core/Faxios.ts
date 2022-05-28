import dispatchRequest from './dispatchRequest'
import { IAxiosRequestConfig, IAxiosPromise, Imethod, IAxiosResponse } from '../types'
import { InterceptorManager } from './InterceptorManager'

interface IInterceptors {
  request: InterceptorManager<IAxiosRequestConfig>
  response: InterceptorManager<IAxiosResponse>
}

class Faxios {
  interceptors: IInterceptors
  constructor() {
    this.interceptors = {
      request: new InterceptorManager<IAxiosRequestConfig>(),
      response: new InterceptorManager<IAxiosResponse>()
    }
  }
  request(url: string | IAxiosRequestConfig, config: IAxiosRequestConfig = {}): IAxiosPromise {
    if (typeof url === 'string') {
      config.url = url
    } else {
      config = url
    }
    return dispatchRequest(config)
  }
  // 不要data的几个方法
  private _requestWithoutData(method: Imethod, url: string, config: IAxiosRequestConfig = {}): IAxiosPromise {
    return this.request({
      ...config,
      method,
      url
    })
  }
  get(url: string, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestWithoutData('get', url, config)
  }
  delete(url: string, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestWithoutData('delete', url, config)
  }
  head(url: string, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestWithoutData('head', url, config)
  }
  options(url: string, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestWithoutData('options', url, config)
  }

  // 要data的几个方法
  private _requestWithData(method: Imethod, url: string, data: any, config: IAxiosRequestConfig = {}): IAxiosPromise {
    return this.request({
      ...config,
      data,
      method,
      url
    })
  }
  post(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestWithData('post', url, data, config)
  }
  patch(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestWithData('patch', url, data, config)
  }
  put(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestWithData('put', url, data, config)
  }
}

export default Faxios
