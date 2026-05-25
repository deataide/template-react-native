import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { WizardFormInput } from '../schema/wizard.schema'

interface WizardStoreState {
  formData: Partial<WizardFormInput>
  currentStep: number
  setCurrentStep: (step: number) => void
  setFormData: (data: Partial<WizardFormInput>) => void
  reset: () => void
}

const initialData: Partial<WizardFormInput> = {
  fullName: '',
  email: '',
  age: undefined,
  occupation: '',
  city: '',
  goals: '',
}

export const useWizardStore = create<WizardStoreState>()(
  persist(
    (set) => ({
      formData: initialData,
      currentStep: 0,
      setCurrentStep: (step) => set({ currentStep: step }),
      setFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
      reset: () => set({ formData: initialData, currentStep: 0 }),
    }),
    {
      name: '@wizard_form',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        currentStep: state.currentStep,
      }),
    }
  )
)
