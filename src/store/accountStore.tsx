import { AxiosError, AxiosResponse } from 'axios'
import { util } from 'zod'
import { create } from 'zustand'

import { getEmail } from '@/utils/useToken'

import api from '../axiosInstance'

export interface AccountState {
  email: string
  nickname: string
  phone: string
}

interface StoreState {
  account: AccountState
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
      const res: AxiosResponse<HttpResp<AccountState>> = await api.post(
        '/account/getAccount',
        { email }
      )
      set({
        account: res.data.data,
      })
      return res.data.data
    } catch (error: any) {
      set({
        error: (error as AxiosError<ErrorResponse>).response!.data.msg,
      })
    }
  },
}))
