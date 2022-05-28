import { IAxiosInterceptorManager, FResolveFn, FRejectedeFn } from '../types'

interface IInterceptor<T> {
  resolve: FResolveFn<T>
  reject?: FRejectedeFn
}

class InterceptorManager<T> {
  private interceptors: Array<IInterceptor<T> | null>
  constructor() {
    this.interceptors = []
  }

  use(resolve: FResolveFn<T>, reject?: FRejectedeFn): number {
    this.interceptors.push({
      resolve,
      reject
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
