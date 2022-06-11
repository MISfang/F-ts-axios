import { IAxiosInterceptorManager, FResolveFn, FRejectedeFn } from '../types'

interface IInterceptor<T> {
  resolved: FResolveFn<T>
  rejected?: FRejectedeFn
}

class InterceptorManager<T> implements IAxiosInterceptorManager<T> {
  private interceptors: Array<IInterceptor<T> | null>

  constructor() {
    this.interceptors = []
  }

  use(resolved: FResolveFn<T>, rejected?: FRejectedeFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length - 1
  }

  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }

  forEach(fn: (interceptor: IInterceptor<T>) => void): void {
    this.interceptors.forEach(item => {
      if (item !== null) {
        fn(item)
      }
    })
  }
}

export { InterceptorManager }
