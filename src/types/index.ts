type methodsLittle = 'get' | 'post' | 'delete' | 'head' | 'options' | 'post' | 'put' | 'patch'
type methodsBig = 'GET' | 'POST' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH'
type Methods = methodsBig | methodsLittle

export interface IAxiosRequestConfig {
  url?: string
  method?: Methods
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface IAxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: IAxiosRequestConfig
  request: any
}

export interface IAxiosPromise extends Promise<IAxiosResponse> {}

export interface IAxiosError extends Error {
  config: IAxiosRequestConfig
  code?: string
  request?: any
  response?: IAxiosResponse
  isAxiosError: boolean
}

export interface IAxios {
  request(config: IAxiosRequestConfig): IAxiosPromise
  get(config: IAxiosRequestConfig): IAxiosPromise
  delete(config: IAxiosRequestConfig): IAxiosPromise
  head(config: IAxiosRequestConfig): IAxiosPromise
  options(config: IAxiosRequestConfig): IAxiosPromise

  post(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise
  put(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise
  patch(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise
}

export interface IAxiosInstanse extends IAxios {
  (config: IAxiosRequestConfig): IAxiosPromise
}
