import { Navigate, Outlet } from 'react-router-dom'

import { getToken } from '@/utils/useToken'

const ProtectedRoute: React.FC = () => {
  // 检查本地存储中是否有token
  const token = getToken()

  // 如果没有token，重定向到登录页面
  if (!token) {
    return <Navigate to="/login" replace />
  }

  // 如果有token，渲染子路由
  return <Outlet />
}

export default ProtectedRoute
