import { useEffect } from 'react'
import { View } from 'react-native'
import { useColorScheme } from 'nativewind'
import { useThemeStore } from '@/shared/stores/theme.store'
import { cssVarsByTheme } from '@/shared/theme/cssVars'

export const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { isDark } = useThemeStore()
  const { setColorScheme } = useColorScheme()

  useEffect(() => {
    setColorScheme(isDark ? 'dark' : 'light')
  }, [isDark])

  return (
    <View
      style={[{ flex: 1 }, cssVarsByTheme[isDark ? 'dark' : 'light']]}
      className={isDark ? 'dark' : ''}
    >
      {children}
    </View>
  )
}