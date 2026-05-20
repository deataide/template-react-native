import { useTheme } from "@/shared/hooks/useTheme";
import { AppThemeProvider } from "@/shared/providers/ThemeProvider/theme";
import { env } from '@/shared/config/env'
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout() {
  
const queryClient = new QueryClient();
  console.log("Running:", env.EXPO_PUBLIC_APP_ENV);

  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <SafeAreaProvider>
      <AppThemeProvider>
        <QueryClientProvider client={queryClient}>
          <LayoutContent />
        </QueryClientProvider>
      </AppThemeProvider>
    </SafeAreaProvider>
  );
}


function LayoutContent() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        animation: "none",
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="+not-found"
        options={{ title: "Página não encontrada" }}
      />
    </Stack>
  );
}
