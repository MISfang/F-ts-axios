import { IAxiosRequestConfig, IAxiosPromise } from '../types'
import xhr from './xhr'
import { buildUrl, buildData, buildHeaders, buildResponseData } from '../helpers'

function Faxios(config: IAxiosRequestConfig): IAxiosPromise {
  processConfig(config)
  return xhr(config).then(response => {
    response.data = buildResponseData(response.data)
    return response
  })
}

const processConfig = (config: IAxiosRequestConfig) => {
  config.url = transformUrl(config)
  config.headers = transformRequestHeaders(config)
  config.data = transformRequestData(config)
}

const transformUrl = ({ url, params }: IAxiosRequestConfig) => {
  return buildUrl(url!, params)
}

const transformRequestData = ({ data }: IAxiosRequestConfig) => {
  return buildData(data)
}

const transformRequestHeaders = ({ headers = {}, data }: IAxiosRequestConfig) => {
  return buildHeaders(headers, data)
}

export default Faxios
