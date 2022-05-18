import { Imethod } from './enum'
interface IAxiosRequestConfig {
  url: string
  method?: Imethod
  data?: any
  params?: any
}

export { IAxiosRequestConfig }
