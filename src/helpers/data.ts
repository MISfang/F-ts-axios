import { isPlainObject } from './utils'

const transformRequest = (data: any) => {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }

  return data
}

const transformResponse = (data: any) => {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (error) {
      // 如果不是字符串的话，什么也不做
    }
  }
}

export { transformRequest, transformResponse }
