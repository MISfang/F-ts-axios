import { IAxiosRequestConfig, IAxiosPromise, IAxiosResponse } from '../types'
import { buildResponseHeader, handleStatus, createError } from '../helpers'

export default function xhr(config: IAxiosRequestConfig): IAxiosPromise {
  return new Promise((resolve, reject) => {
    const { url, method = 'get', data = null, headers, responseType, timeout = 0 } = config
    const xhr = new XMLHttpRequest()

    if (responseType) {
      xhr.responseType = responseType
    }
    if (timeout) {
      xhr.timeout = timeout
    }
    xhr.open(method.toUpperCase(), url!, true)

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return
      }
      if (xhr.status === 0) {
        return
      }
      const responseHeaders = xhr.getAllResponseHeaders()
      const responseData = responseType !== 'text' ? xhr.response : xhr.responseText
      const response: IAxiosResponse = {
        data: responseData,
        status: xhr.status,
        statusText: xhr.statusText,
        headers: buildResponseHeader(responseHeaders),
        config,
        request: xhr
      }

      handleStatus(response, resolve, reject, config, xhr, response)
    }

    // 错误处理区域
    xhr.onerror = () => {
      reject(createError('网络错误！请检查网络连接！', config, null, xhr))
    }
    xhr.ontimeout = () => {
      reject(createError(`请求超时(${timeout})，请稍后重试！`, config, 'Request TimeOut!', xhr))
    }
    // 错误处理区域结束

    Object.keys(headers).forEach(key => {
      if (data === null && key.toLowerCase() === 'content-type') {
        delete headers[key]
      } else {
        xhr.setRequestHeader(key, headers[key])
      }
    })

    xhr.send(data)
  })
}
