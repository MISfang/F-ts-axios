import { isObject } from './utils'

const normalizedHeaders = (headers: any, target: string) => {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(item => {
    if (item !== target && item.toUpperCase() === target.toUpperCase()) {
      headers[target] = headers[item]
      delete headers[item]
    }
  })
}

const buildHeaders = (headers: any, data: any): any => {
  normalizedHeaders(headers, 'Content-Type')
  if (isObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}

const buildResponseHeader = (headers: string): any => {
  const res = Object.create(null)
  if (!headers) {
    return res
  }
  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    if (key && val) {
      key = key.trim().toLowerCase()
      val = val.trim()
      res[key] = val
    }
  })

  return res
}

export { buildHeaders, buildResponseHeader }
