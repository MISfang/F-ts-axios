import { buildURL } from './helpers/url'
import { IAxiosRequestConfig } from './types'
import xhr from './xhr'

const Faxios = (config: IAxiosRequestConfig) => {
  processConfig(config)
  xhr(config)
}

const processConfig = (config: IAxiosRequestConfig) => {
  config = {
    ...config,
    url: transFormURL(config)
  }
}

// 对URL的处理，像processConfig汇总
const transFormURL = ({ url, params }: IAxiosRequestConfig) => {
  return buildURL(url, params)
}

export default Faxios
