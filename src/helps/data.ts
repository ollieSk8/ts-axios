import { isPlainObject } from './until'

//处理 request data 如果是对象 发送时候变为字符串对象
export function transfromRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

//处理响应数据 字符串 变为 对象

export function transfromResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch {}
  }
  return data
}
