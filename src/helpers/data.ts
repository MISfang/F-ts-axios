import { isObject, Ftype } from './utils'

const buildData = (data: any): any => {
  if (isObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

const buildResponseData = (data: any): any => {
  if (Ftype(data) === 'string') {
    try {
      data = JSON.parse(data)
    } catch (error) {
      //什么也不做
    }
  }
  return data
}

export { buildResponseData, buildData }
