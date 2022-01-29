import { FAxios } from './core/FAxios'
import { extend } from './helpers/utils'
import { IAxiosInstanse } from './types'

const createInstance = (): IAxiosInstanse => {
  const context = new FAxios()
  const instance = FAxios.prototype.request.bind(context)
  extend(instance, context)
  return instance as IAxiosInstanse
}

const Faxios = createInstance()

export default Faxios
