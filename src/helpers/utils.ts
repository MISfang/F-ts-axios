import Faxios from '../core/Faxios'
const Ftype = (target: any) => {
  return Object.prototype.toString
    .call(target)
    .toLowerCase()
    .slice(8, -1)
}
const isDate = (target: any): target is Date => Ftype(target) === 'date'
const isObject = (target: any): target is Object => Ftype(target) === 'object'

const extend = <T, U>(to: T, from: U): T & U => {
  const arr = ['request', 'get', 'post', 'delete', 'head', 'options', 'patch', 'put', '_requestWithData', '_requestWithoutData', 'interceptors', 'defaults']
  arr.forEach(name => {
    //@ts-ignore
    to[name] = from[name]
  })
  return to as T & U
}
const deepClone = (target: any, map = new WeakMap()): any => {
  if (typeof target !== 'object' && target !== null) return target

  if (map.has(target)) return map.get(target)
  let res: any = {}
  map.set(target, res)

  if (Ftype(target) === 'map') {
    res = new Map()
    target.forEach((value: any, key: any) => res.set(deepClone(key, map), deepClone(value, map)))
  }

  if (Ftype(target) === 'set') {
    res = new Set()
    target.forEach((value: any) => res.add(deepClone(value, map)))
  }

  if (Ftype(target) === 'array') {
    res = target.map((value: any) => deepClone(value, map))
  }

  for (const key in target) {
    if ((target as Object).hasOwnProperty(key)) {
      res[key] = deepClone(target[key], map)
    }
  }

  return res
}

const deepMerge = (...objs: any[]) => {
  const res = Object.create(null)
  for (const obj of objs) {
    if (obj) {
      Object.keys(obj).forEach((key: any) => {
        const val = obj[key]
        if (isObject(val)) {
          if (isObject(res[key])) {
            res[key] = deepMerge(res[key], val)
          } else {
            res[key] = deepMerge(val)
          }
        } else {
          res[key] = val
        }
      })
    }
  }
}
export { Ftype, isDate, isObject, extend, deepClone, deepMerge }
