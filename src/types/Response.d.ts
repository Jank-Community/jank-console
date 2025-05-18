type Response<T> = SuccessResponse<T> | ErrorResponse<T>

// 正确响应的类型
type SuccessResponse<T = any> = {
  data: T
  requestId: string
  timeStamp: number
}

// 错误响应的类型
type ErrorResponse<T = any> = {
  code: number
  msg: string
  data: T
  requestId: string
  timeStamp: number
}
