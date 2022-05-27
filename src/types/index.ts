import { Imethod } from './enum'
interface IAxiosRequestConfig {
  url: string
  method?: Imethod
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}
interface IAxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: IAxiosRequestConfig
  request: any
}

interface IAxiosPromise extends Promise<IAxiosResponse> {}

export { IAxiosRequestConfig, IAxiosResponse, IAxiosPromise }
