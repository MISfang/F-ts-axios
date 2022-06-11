import { IAxiosIntsance, IAxiosRequestConfig } from '../types'
import Faxios from './Faxios'
import { extend } from '../helpers'
import { defaultConfig } from './defaults'

function createIntsance(config: IAxiosRequestConfig) {
  const context = new Faxios(config)
  const request = Faxios.prototype.request
  const instance = request.bind(context)
  extend(instance, context)
  return instance as IAxiosIntsance
}

const axios = createIntsance(defaultConfig)

export default axios
