import { IAxiosResponse, IAxiosRequestConfig } from '../types'
import { createError } from './index'

const handleStatus = (response: IAxiosResponse, resolve: Function, reject: Function, config: IAxiosRequestConfig, req: any, res: any) => {
  if (response.status >= 200 && response.status < 300) {
    resolve(response)
  } else {
    reject(createError(`请求失败,状态码为${response.status}`, config, 'RequestError!', req, res))
  }
}

export { handleStatus }
