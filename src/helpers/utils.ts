const { toString: FtoString } = Object.prototype

const isDate = (val: any): val is Date => {
  return FtoString.call(val) === '[object Date]'
}

// const isObject = (val: any): val is Object => {
//   return val !== null && typeof val === 'object'
// }
const isPlainObject = (val: any): val is Object => {
  return FtoString.call(val) === '[object Object]'
}
const enCode = (val: string): string => {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export { isDate, enCode, isPlainObject }
