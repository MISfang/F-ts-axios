import { isDate, isObject, enCode } from './utils'

const buildURL = (url: string, params?: any): string => {
  if (!params) return url

  const parts: string[] = []
  Object.keys(params).forEach(item => {
    const val = params[item]
    if (val === null || typeof val === 'undefined') {
      return
    }
    let values = []
    if (Array.isArray(val)) {
      values = val
      item += '[]'
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${enCode(item)}=${enCode(val)}`)
    })
  })

  let resStr: string = parts.join('&')

  if (resStr) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += url.indexOf('?') === -1 ? '?' : '&' + resStr
  }

  return url
}

export { buildURL }
