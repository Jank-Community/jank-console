import { AxiosError, AxiosResponse } from 'axios'
import { create } from 'zustand'

// 引入 Axios 实例
import api from '../axiosInstance'

interface authStore {
  name: string
  permissions: any[]
  token: string | null
  refreshToken: string
  isLoading: boolean
  error: string | null
  login: (email: string, password: string, vercode: string) => Promise<boolean> // 修改返回类型为 Promise<boolean>
  logout: () => void
}

export const useAuthStore = create<authStore>((set) => ({
  name: '',
  permissions: [],
  token: '',
  refreshToken: '',
  isLoading: false,
  error: null,
  login: async (email: string, password: string, vercode: string) => {
    set({ isLoading: true, error: null })
    try {
      const res: AxiosResponse<{
        access_token: string
        refresh_token: string
      }> = await api.post('/account/loginAccount', {
        email: email,
        img_verification_code: vercode,
        password: password,
      })

      const { access_token, refresh_token } = res.data

      set({
        token: access_token,
        refreshToken: refresh_token,
        isLoading: false,
      })

      // 在这里直接保存到 localStorage
      localStorage.setItem('token', access_token)
      localStorage.setItem('refreshToken', refresh_token)
      localStorage.setItem('email', email)

      return true
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        set({
          error: (error as AxiosError<ErrorResponse>).response!.data.msg,
          isLoading: false,
        })
      }
      return false
    }
  },
  logout: () => {
    set({ token: null, refreshToken: '' })
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('email')
    window.location.href = '/login'
  },
}))
