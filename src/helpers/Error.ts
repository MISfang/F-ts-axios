import { IAxiosRequestConfig, IAxiosResponse } from '../types'

class AxiosError extends Error {
  isAxiosError: boolean
  config: IAxiosRequestConfig
  code?: string | null
  request?: any
  response?: IAxiosResponse

  constructor(message: string, config: IAxiosRequestConfig, code?: string | null, request?: any, response?: IAxiosResponse) {
    super(message)
    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

const createError = (message: string, config: IAxiosRequestConfig, code?: string | null, request?: any, response?: IAxiosResponse) => {
  return new AxiosError(message, config, code, request, response)
}

export { AxiosError, createError }
