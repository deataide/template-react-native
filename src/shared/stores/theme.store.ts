import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppTheme, DarkAppTheme, LightAppTheme } from '../theme'
interface ThemeStore {
  isDark: boolean
  theme: AppTheme
  toggleTheme: () => void
  setDark: (value: boolean) => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      isDark: true,
      theme: DarkAppTheme,
      toggleTheme: () => {
        const next = !get().isDark
        set({ isDark: next, theme: next ? DarkAppTheme : LightAppTheme })
      },
      setDark: (value) =>
        set({ isDark: value, theme: value ? DarkAppTheme : LightAppTheme }),
    }),
    {
      name: '@app_theme',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ isDark: state.isDark }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.theme = state.isDark ? DarkAppTheme : LightAppTheme
        }
      },
    }
  )
)
