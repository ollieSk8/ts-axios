import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helps/until'

/**
 * 
 * 在 createInstance 工厂函数的内部，我们首先实例化了 Axios 实例 context，
 * 接着创建instance 指向 Axios.prototype.request 方法，并绑定了上下文 context；
 * 接着通过 extend 方法把 context 中的原型方法和实例方法全部拷贝到 instance 上，
 * 这样就实现了一个混合对象：instance 本身是一个函数，
 * 又拥有了 Axios 类的所有原型和实例属性，最终把这个 instance 返回。
 * 由于这里 TypeScript 不能正确推断 instance 的类型，我们把它断言成 AxiosInstance 类型。

  这样我们就可以通过 createInstance 工厂函数创建了 axios，
  当直接调用 axios 方法就相当于执行了 Axios 类的 request 方法发送请求，
  当然我们也可以调用 axios.get、axios.post 等方法
 */
function createIntance(): AxiosInstance {
  //Axios Class 创建context实例对象
  const context = new Axios()
  //ts编译es5 所有可以找到 Axios 原型上的request bind指向context实例对象
  const instance = Axios.prototype.request.bind(context)
  //把context 上的各种方法 request post get patch 等所有方法复制到instance实例上 实例就是request方法
  extend(instance, context)
  //instance 既是request 方法 又有 context上的各种方法 是一个混合对象
  return instance as AxiosInstance
}

const axios = createIntance()

export default axios
