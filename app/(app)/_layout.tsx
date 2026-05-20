import { useTheme } from '@/shared/hooks/useTheme';
import { Stack } from 'expo-router';

export default function AppLayout() {

  const { theme } = useTheme();
  const formHeaderOptions = {
    title: 'Formulário',
  };

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
    >
      <Stack.Screen
        name="form"
        options={formHeaderOptions}
      />
            <Stack.Screen name="form/step-1" options={formHeaderOptions} />
            <Stack.Screen name="form/step-2" options={formHeaderOptions} />
            <Stack.Screen name="form/step-3" options={formHeaderOptions} />

    </Stack>
  );
}
