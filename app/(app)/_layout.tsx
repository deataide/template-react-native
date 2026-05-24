import { useTheme } from '@/shared/hooks/useTheme';
import { Stack } from 'expo-router';

export default function AppLayout() {

  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: true,

        headerStyle: {
          backgroundColor: theme.colors.background,
        },

        headerTintColor: theme.colors.text.primary,

        headerTitleStyle: {
          fontWeight: '600',
        },

        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    />
  );
}
