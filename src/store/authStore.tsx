import { create } from 'zustand'

// 引入 Axios 实例
import { parseQuery } from '@/utils'

import api from '../axiosInstance'

interface authStore {
  name: string
  permissions: any[]
  token: string | null
  refreshToken: string
  isLoading: boolean
  error: string | null
  login: (username: string, password: string) => Promise<any>
  logout: () => void
}

export const useAuthStore = create<authStore>((set) => ({
  name: '',
  permissions: [],
  token: '',
  refreshToken: '',
  isLoading: false,
  error: null,
  login: async (username: string, password: string) => {
    set({ isLoading: true, error: null })
    try {
      const data: any = await api.post('/account/loginAccount')
      if (data.code == 200) {
        set({
          name: data.data.nickname,
          permissions: data.data.permissions,
          token: data.data.token,
          refreshToken: data.data.refreshToken,
          isLoading: false,
        })
      } else {
        set({
          isLoading: false,
        })
      }
      return data
    } catch (error: any) {
      set({
        error: error.response?.data?.msg || 'Login failed',
        isLoading: false,
      })
    }
  },
  logout: () => {
    set({ token: null, refreshToken: '' })
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    window.location.href = '/login'
  },
}))
