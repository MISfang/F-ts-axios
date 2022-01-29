import { transformResponse } from './helpers/data'
import { parseHeaders } from './helpers/headers'
import { IAxiosRequestConfig, IAxiosPromise, IAxiosResponse } from './types'

export default function xhr(config: IAxiosRequestConfig): IAxiosPromise {
  const { data = null, url, method = 'get', params, headers, responseType } = config
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    if (responseType) {
      xhr.responseType = responseType
    }
    xhr.open(method.toUpperCase(), url, true)

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return
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

    Object.keys(headers).forEach(key => {
      if (data === null && key.toLowerCase() === 'content-type') {
        delete headers[key]
      } else {
        xhr.setRequestHeader(key, headers[key])
      }
    })

    xhr.send(null)
  })
}
