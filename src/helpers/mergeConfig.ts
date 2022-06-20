import { IAxiosRequestConfig } from '../types'
import { isObject, deepMerge } from './utils'
interface mapObj {
  [key: string]: Function
}

const utils = (stringArr: string[], fn: Function, obj: any): mapObj => {
  for (const key of stringArr) {
    obj[key] = fn
  }
  return obj
}

const merge1 = (val1: any, val2: any): any => val2 ?? val1
const merge2 = (val1: any, val2: any): any => val2 ?? null
const merge3 = (val1: any, val2: any): any => {
  if (isObject(val2)) {
    return deepMerge(val1, val2)
  }
  if (typeof val2 !== 'undefined') {
    return val2
  }
  if (isObject(val1)) {
    return deepMerge(val1)
  }
  if (typeof val1 !== 'undefined') {
    return val1
  }
}
const keyToFn = Object.create(null)
const valueFromVal2 = ['url', 'params', 'data']
const valueNeedDeepMerge = ['headers']
utils(valueFromVal2, merge2, keyToFn)
utils(valueNeedDeepMerge, merge3, keyToFn)

const mergeConfig = (config1: IAxiosRequestConfig, config2: IAxiosRequestConfig = {}): IAxiosRequestConfig => {
  const res = Object.create(null)
  for (const key in config2) {
    mergeField(key)
  }
  for (const key in config1) {
    if (!(key in res)) mergeField(key)
  }
  function mergeField(key: string) {
    const fn = keyToFn[key] ?? merge1
    res[key] = fn(config1[key], config2[key])
  }
  return res
}

export default mergeConfig
