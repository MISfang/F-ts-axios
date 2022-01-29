import { isPlainObject } from './utils'

const normalizeheaderName = (headers: any, normalizeName: string) => {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()) {
      headers[normalizeName] = headers[name]
      delete headers[name]
    }
  })
}

const processHeaders = (headers: any, data: any) => {
  normalizeheaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}

interface IParsed {
  [key: string]: string
}
const parseHeaders = (headers: string) => {
  let parsed: IParsed = {}
  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }

    parsed[key] = val
  })

  return parsed
}

export { processHeaders, parseHeaders }
