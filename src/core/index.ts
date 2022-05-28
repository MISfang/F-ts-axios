import { IAxiosIntsance } from '../types'
import Faxios from './Faxios'
import { extend } from '../helpers'

function createIntsance() {
  const context = new Faxios()
  const request = Faxios.prototype.request
  const instance = request.bind(context)
  extend(instance, context)
  return instance as IAxiosIntsance
}

const axios = createIntsance()

export default axios
