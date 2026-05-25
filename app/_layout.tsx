import { useTheme } from "@shared/hooks/useTheme";
import { useI18n } from "@shared/hooks/useI18n";
import { AppProviders } from "@shared/providers/AppProviders";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import "../global.css";

export default function RootLayout() {
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
    <AppProviders>
      <LayoutContent />
    </AppProviders>
  );
}


function LayoutContent() {
  const { theme } = useTheme();
  const { t } = useI18n();

  return (
    <Stack
      screenOptions={{
        animation: "none",
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen name="(public)" />
      <Stack.Screen name="(app)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="+not-found"
        options={{ title: t.app.notFoundTitle }}
      />
    </Stack>
  );
}
