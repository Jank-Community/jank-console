import axios, {
  AxiosError,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import qs from 'qs'

import useErrorStore from './store/errorStore'
import { parseErrorString } from './utils/parseErrString'

// 请求白名单，无须token的接口
const whiteList: string[] = ['/login']
// 所有通过api发送的请求，都会加上/api的前缀
const api = axios.create({
  // baseURL: '/api',
  baseURL: 'http://8.130.108.74:9010/api/v1',
})

// request拦截器
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 是否需要设置 token
    let isToken = true
    whiteList.some((v) => {
      if (config.url && config.url.startsWith(v)) {
        return (isToken = false)
      }
    })
    if (localStorage.getItem('token') && isToken) {
      config.headers.Authorization = 'Bearer ' + localStorage.getItem('token') // 让每个请求携带自定义token
    }
    if (localStorage.getItem('refreshToken') && isToken) {
      //INFO: REFRESH_TOKEN是后端获取的key，如果token过期，后端有中间件获取此key，以刷新token
      //WARN: 后端的refreshtoken暂未验证具体key名，但大概率是这个
      config.headers.REFRESH_TOKEN = localStorage.getItem('refreshToken') // 让每个请求携带自定义token
    }

    const params = config.params || {}
    const data = config.data || false
    if (
      config.method?.toUpperCase() === 'POST' &&
      (config.headers as AxiosRequestHeaders)['Content-Type'] ===
        'application/x-www-form-urlencoded'
    ) {
      config.data = qs.stringify(data)
    }
    // get参数编码
    if (config.method?.toUpperCase() === 'GET' && params) {
      config.params = {}
      const paramsStr = qs.stringify(params, { allowDots: true })
      if (paramsStr) {
        config.url = config.url + '?' + paramsStr
      }
    }
    return config
  },
  (error: AxiosError) => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
api.interceptors.response.use(
  async (
    response: AxiosResponse<SuccessResponse<any>>
  ): Promise<AxiosResponse<SuccessResponse<any>>> => {
    // 所有200的响应在此处处理
    //如果token过期，后端通过refreshtoken重新返回token
    //WARN: 此功能未经测试
    if (response.headers['access_token']) {
      console.log(response.headers['access_token'])
      localStorage.setItem('token', response.headers['access_token'])
    }
    if (response.headers['refresh_token']) {
      console.log(response.headers['refresh_token'])
      localStorage.setItem('refreshToken', response.headers['refresh_token'])
    }
    return response
  },

  // 非200响应，在以下处理
  (error: AxiosError<ErrorResponse>) => {
    //400响应可以直接使用msg
    //
    console.log(error)
    const errorstr = parseErrorString(error.response!.data.msg.toString())
    const setError = useErrorStore.getState().setError
    //INFO: 此处根据后端返回内容的异同而修改
    if (error.response?.status == 400) {
      setError(errorstr)
      return Promise.reject(error)
    }
    if (error.response?.status == 500) {
      setError(errorstr)
      return Promise.reject(error)
    }
  }
)

export default api
