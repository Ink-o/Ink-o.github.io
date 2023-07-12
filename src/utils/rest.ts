import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { IAnybject, IResult } from './type'

class Rest {
  axiosIns?: AxiosInstance

  constructor() {
    this.init()
  }
  init() {
    this.axiosIns = this._initAxiosIns()
  }
  get<T>(url: string, params: IAnybject = {}) {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url,
      params,
    }
    return this.request<T>(config)
  }
  post<T>(url: string, data: IAnybject = {}) {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
    }
    return this.request<T>(config)
  }
  request<T>(config: AxiosRequestConfig):Promise<IResult<T>> {
    return this.axiosIns<IResult<T>>?.(config).then(res => res.data, err => err)!
  }
  _initAxiosIns() {
    // TODO: 后面可以再补充
    return axios.create({
      baseURL: 'https://66b8n5g7ji.hk.aircode.run',
      timeout: 5 * 60 * 1000, // 5分钟超时
      headers: {
        token: 'token_catAndDog',
      },
    })
  }
}
export default new Rest()

export const isValidCode = (code: number) => {
  return code === 200
}
