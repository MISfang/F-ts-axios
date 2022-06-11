import { IAxiosRequestConfig } from '../types'

const defaultConfig: IAxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json,text/plain,*/*'
    }
  }
}

const methodsNoData = ['get', 'delete', 'head', 'option']
const methodsWithData = ['put', 'patch', 'post']
methodsNoData.forEach(method => {
  defaultConfig.headers[method] = {}
})
methodsWithData.forEach(method => {
  defaultConfig.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export { defaultConfig }
