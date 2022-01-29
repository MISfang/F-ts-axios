import { transformResponse } from './helpers/data'
import { parseHeaders } from './helpers/headers'
import { IAxiosRequestConfig, IAxiosPromise, IAxiosResponse } from './types'

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
    xhr.open(method.toUpperCase(), url, true)

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

      resolve(response)
    }

    // 错误处理方法
    xhr.onerror = () => {
      reject(new Error('网络错误'))
    }
    // 超时处理方法
    xhr.ontimeout = () => {
      reject(new Error(`超过 ${timeout} 时间`))
    }

    Object.keys(headers).forEach(key => {
      if (data === null && key.toLowerCase() === 'content-type') {
        delete headers[key]
      } else {
        xhr.setRequestHeader(key, headers[key])
      }
    })

    xhr.send(null)

    // 辅助处理返回resopnse的方法
    const handleResponse = (response: IAxiosResponse) => {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(new Error(`请求错误,状态码${response.status}`))
      }
    }
  })
}
