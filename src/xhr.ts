import { IAxiosRequestConfig } from './types'

export default function xhr({ data = null, url, method = 'get', params }: IAxiosRequestConfig): void {
  const xhr = new XMLHttpRequest()
  xhr.open(method.toUpperCase(), url, true)
  xhr.send(null)
}
