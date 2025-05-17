import { create } from 'zustand'

interface ErrorStore {
  error: any // Consider using a more specific type than 'any' if possible
  setError: (error: any) => void
  clearError: () => void
}

const useErrorStore = create<ErrorStore>((set) => ({
  error: null,
  setError: (error: any) => set({ error }),
  clearError: () => set({ error: null }),
}))

export default useErrorStore
