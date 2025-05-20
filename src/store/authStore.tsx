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
  login: (email: string, password: string, vercode: string) => Promise<boolean>
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
      const res: AxiosResponse<
        SuccessResponse<{ access_token: string; refresh_token: string }>
      > = await api.post('/account/loginAccount', {
        email: email,
        img_verification_code: vercode,
        password: password,
      })
      set({
        token: res.data.data.access_token,
        refreshToken: res.data.data.refresh_token,
        isLoading: false,
      })
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
    window.location.href = '/login'
  },
}))
