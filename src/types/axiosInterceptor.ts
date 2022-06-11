interface IAxiosInterceptorManager<T> {
  use(resolved: FResolveFn<T>, rejected?: FRejectedeFn): number
  eject(id: number): void
}
interface FResolveFn<T> {
  (val: T): T | Promise<T>
}
interface FRejectedeFn {
  (err: any): any
}

export { IAxiosInterceptorManager, FResolveFn, FRejectedeFn }
