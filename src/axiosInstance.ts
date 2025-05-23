import axios, {
  AxiosError,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import qs from 'qs'
import { toast } from 'sonner'

import useErrorStore from './store/errorStore'
import { parseErrorString } from './utils/parseErrString'
import { clearToken } from './utils/useToken'

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
      config.headers['Refresh-Token'] = localStorage.getItem('refreshToken') // 让每个请求携带自定义token
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
    const newAccessToken = response.headers['Authorization']?.replace(
      'Bearer ',
      ''
    )
    const newRefreshToken = response.headers['Refresh-Token']
    if (newAccessToken) {
      localStorage.setItem('token', newAccessToken)
    }
    if (newRefreshToken) {
      localStorage.setItem('refreshToken', newRefreshToken)
    }
    return response
  },

  // 非200响应，在以下处理
  (error: AxiosError<ErrorResponse>) => {
    //400响应可以直接使用msg
    const errorObj = parseErrorString<errRes>(
      error.response!.data.msg.toString()
    )
    const setError = useErrorStore.getState().setError
    //INFO: 此处根据后端返回内容的异同而修改
    if (error.response?.status == 400) {
      setError(errorObj.message)
      return Promise.reject(error)
    }
    if (error.response?.status == 500) {
      setError(errorObj.message)
      if (errorObj.code === 401) {
        toast.error(errorObj.message)
        clearToken()
        window.location.href = '/login'
      }
      return Promise.reject(error)
    }
    return Promise.reject(error)
  }
)

export default api
