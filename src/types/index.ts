type methodsLittle = 'get' | 'post' | 'delete' | 'head' | 'options' | 'post' | 'put' | 'patch'
type methodsBig = 'GET' | 'POST' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH'
export type Methods = methodsBig | methodsLittle

export interface IAxiosRequestConfig {
  url: string
  method?: Methods
  data?: any
  params?: any
}
