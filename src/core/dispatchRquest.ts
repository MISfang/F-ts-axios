import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders } from '../helpers/headers'
import { buildURL } from '../helpers/url'
import { IAxiosPromise, IAxiosRequestConfig, IAxiosResponse } from '../types'
import xhr from './xhr'

const dispatchRequest = (config: IAxiosRequestConfig): IAxiosPromise => {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

// 处理逻辑
const processConfig = (config: IAxiosRequestConfig) => {
  config.url = transFormURL(config)
  // 在data转化成JSON字符串之前处理headers
  config.headers = transFormHeaders(config)
  config.data = transFormData(config)
}

// 对URL的处理，像processConfig汇总
const transFormURL = ({ url, params }: IAxiosRequestConfig) => {
  return buildURL(url!, params)
}

// 对Data的处理，像processConfig汇总
const transFormData = ({ data }: IAxiosRequestConfig) => {
  return transformRequest(data)
}

// 对Headers的处理，像processConfig汇总
const transFormHeaders = ({ headers = {}, data }: IAxiosRequestConfig) => {
  return processHeaders(headers, data)
}
// 对响应数据自动转化成JSON对象
const transformResponseData = (res: IAxiosResponse): IAxiosResponse => {
  res.data = transformResponse(res.data)
  return res
}

export default dispatchRequest
