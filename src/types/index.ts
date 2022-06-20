import { Imethod } from './enum'
import { IInterceptors } from '../core/Faxios'
interface IAxiosRequestConfig {
  url?: string
  method?: Imethod
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  [key: string]: any
}
interface IAxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: IAxiosRequestConfig
  request: any
}

interface IAxiosError extends Error {
  isAxiosError: boolean
  config: IAxiosRequestConfig
  code?: string | null
  request?: any
  response?: IAxiosResponse
}

interface IAxiosPromise<T = any> extends Promise<IAxiosResponse<T>> {}

interface IFaxios {
  defaults: IAxiosRequestConfig
  interceptors: IInterceptors
  request<T = any>(config: IAxiosRequestConfig): IAxiosPromise<T>

  get<T = any>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T>
  delete<T = any>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T>
  head<T = any>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T>
  options<T = any>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise<T>
  put<T = any>(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise<T>
  patch<T = any>(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise<T>
}

interface IAxiosIntsance extends IFaxios {
  <T = any>(config: IAxiosRequestConfig): IAxiosPromise<T>
  <T = any>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T>
}

export { IAxiosRequestConfig, IAxiosResponse, IAxiosPromise, IAxiosError, IAxiosIntsance, IFaxios, Imethod }

export { IAxiosInterceptorManager, FResolveFn, FRejectedeFn } from './axiosInterceptor'
