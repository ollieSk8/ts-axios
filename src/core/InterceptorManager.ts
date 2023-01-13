import { ResolvedFn, RejectedFn } from '../types'
interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}
export default class InterceptorManager<T> {
  private interceptor: Array<Interceptor<T> | null>
  constructor() {
    this.interceptor = []
  }
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
    this.interceptor.push({
      resolved,
      rejected,
    })
    return this.interceptor.length - 1
  }
  forEach(fn: (interceprot: Interceptor<T>) => void): void {
    this.interceptor.forEach((interceprot) => {
      if (interceprot !== null) {
        fn(interceprot)
      }
    })
  }
  eject(id: number): void {
    if (this.interceptor[id] !== null) {
      this.interceptor[id] = null
    }
  }
}
