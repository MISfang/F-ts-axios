import { createError } from '../helpers/Error'
import { parseHeaders } from '../helpers/headers'
import { IAxiosRequestConfig, IAxiosPromise, IAxiosResponse } from '../types'

export default function xhr(config: IAxiosRequestConfig): IAxiosPromise {
  const { data = null, url, method = 'get', params, headers, responseType, timeout } = config
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    if (responseType) {
      xhr.responseType = responseType
    }
    if (timeout) {
      xhr.timeout = timeout
    }
    xhr.open(method.toUpperCase(), url!, true)

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return
      if (xhr.status === 0) return
      const responseHeaders = parseHeaders(xhr.getAllResponseHeaders())
      const responseData = responseType !== 'text' ? xhr.response : xhr.responseText

      const response: IAxiosResponse = {
        data: responseData,
        status: xhr.status,
        statusText: xhr.statusText,
        headers: responseHeaders,
        config,
        request: xhr
      }

      handleResponse(response)
    }

    // 错误处理方法
    xhr.onerror = () => {
      reject(createError('网络错误', config, null, xhr))
    }
    // 超时处理方法
    xhr.ontimeout = () => {
      reject(createError(`超过 ${timeout}ms 时间`, config, 'ECONNABORTED', xhr))
    }

    Object.keys(headers).forEach(key => {
      if (data === null && key.toLowerCase() === 'content-type') {
        delete headers[key]
      } else {
        xhr.setRequestHeader(key, headers[key])
      }
    })

    xhr.send(data)

    // 辅助处理返回resopnse的方法
    const handleResponse = (response: IAxiosResponse) => {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(createError(`请求错误,状态码 ${response.status}`, config, null, xhr, response))
      }
    }
  })
}
