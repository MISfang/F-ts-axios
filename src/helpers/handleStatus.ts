import { IAxiosResponse } from '../types'

const handleStatus = (response: IAxiosResponse, resolve: Function, reject: Function) => {
  if (response.status >= 200 && response.status < 300) {
    resolve(response)
  } else {
    reject(new Error(`请求失败,状态码为${response.status}`))
  }
}

export { handleStatus }
