import dispatchRequest from './dispatchRequest'
import { IAxiosRequestConfig, IAxiosPromise, Imethod, IAxiosResponse, FResolveFn, FRejectedeFn } from '../types'
import { InterceptorManager } from './InterceptorManager'
import mergeConfig from '../helpers/mergeConfig'

export interface IInterceptors {
  request: InterceptorManager<IAxiosRequestConfig>
  response: InterceptorManager<IAxiosResponse>
}

type IDispatchRequest = (config: IAxiosRequestConfig) => IAxiosPromise

interface IPromiseChain<T> {
  resolved: FResolveFn<T> | IDispatchRequest
  rejected?: FRejectedeFn
}

class Faxios {
  interceptors: IInterceptors
  defaults: IAxiosRequestConfig

  constructor(initConfig: IAxiosRequestConfig) {
    this.interceptors = {
      request: new InterceptorManager<IAxiosRequestConfig>(),
      response: new InterceptorManager<IAxiosResponse>()
    }
    this.defaults = initConfig
  }

  request(url: string | IAxiosRequestConfig, config: IAxiosRequestConfig = {}): IAxiosPromise {
    if (typeof url === 'string') {
      config.url = url
    } else {
      config = url
    }
    config = mergeConfig(this.defaults, config)

    const chain: IPromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]
    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })
    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    let resPromise = Promise.resolve(config)
    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      resPromise = resPromise.then(resolved, rejected)
    }
    return resPromise as IAxiosPromise
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
