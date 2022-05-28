interface IAxiosInterceptorManager<T> {
  use(resolve: FResolveFn<T>, reject: FRejectedeFn): number
  eject(id: number): void
}
interface FResolveFn<T> {
  (val: T): T | Promise<T>
}
interface FRejectedeFn {
  (err: any): any
}

export { IAxiosInterceptorManager, FResolveFn, FRejectedeFn }
