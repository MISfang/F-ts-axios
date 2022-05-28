import Faxios from '../core/Faxios'
const Ftype = (target: any) => {
  return Object.prototype.toString
    .call(target)
    .toLowerCase()
    .slice(8, -1)
}
const isDate = (target: any): target is Date => Ftype(target) === 'date'
const isObject = (target: any): target is Object => Ftype(target) === 'object'

function extend<T, U>(to: T, from: U): T & U {
  const arr = ['request', 'get', 'post', 'delete', 'head', 'options', 'patch', 'put', '_requestWithData', '_requestWithoutData']
  for (const val of arr) {
    //@ts-ignore
    ;(to as T & U)[val] = from[val]
  }
  return to as T & U
}

export { Ftype, isDate, isObject, extend }
