import { create } from 'zustand'
import type { ExamplePayload } from '../types/example.types'

interface ExampleStoreState {
  form: Partial<ExamplePayload>
  setForm: (data: Partial<ExamplePayload>) => void
  reset: () => void
}

export const useExampleStore = create<ExampleStoreState>((set) => ({
  form: {},
  setForm: (data) => set((s) => ({ form: { ...s.form, ...data } })),
  reset: () => set({ form: {} }),
}))
