import { AxiosError, AxiosResponse } from 'axios'
import { create } from 'zustand'

import { accountData } from '@/types/account'
import { getEmail } from '@/utils/useToken'

import api from '../axiosInstance'

interface StoreState {
  account: accountData
  isLoading: boolean
  error: string | null
  getAccount: () => Promise<any>
}

export const useAccountStore = create<StoreState>((set) => ({
  account: {
    nickname: '',
    email: '',
    phone: '',
  },
  isLoading: false,
  error: null,
  getAccount: async () => {
    set({ error: null })
    const email = getEmail()
    try {
      const res: AxiosResponse<accountData> = await api.post(
        '/account/getAccount',
        { email }
      )
      set({
        account: res.data,
      })
      return res.data
    } catch (error: any) {
      set({
        error: (error as AxiosError<ErrorResponse>).response!.data.msg,
      })
    }
  },
}))
