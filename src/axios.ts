import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { buildURL } from './helps/url'
import { transfromRequest, transfromResponse } from './helps/data'
import { processHeaders } from './helps/header'
import xhr from './xhr'
function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then((res) => {
    return transfromResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.headers = tranfromHeaders(config)
  config.data = transfromRequestData(config)
}
//处理url参数
function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}
//处理request data参数
function transfromRequestData(config: AxiosRequestConfig): any {
  return transfromRequest(config.data)
}
//处理request header
function tranfromHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}
//处理响应数据
function transfromResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transfromResponse(res.data)
  return res
}
export default axios
