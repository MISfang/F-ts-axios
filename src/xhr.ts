import { IAxiosRequestConfig } from './types'

export default function xhr(config: IAxiosRequestConfig) {
  const { url, method = 'get', data = null, params } = config

  const xhr = new XMLHttpRequest()
  xhr.open(method.toUpperCase(), url, true)
  xhr.onreadystatechange = () => {}
  xhr.send(data)
}
