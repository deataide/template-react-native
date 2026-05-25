import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppThemeProvider } from "@shared/providers/ThemeProvider/theme";
import { createQueryClient } from "@shared/lib/react-query/query-client";

type Props = {
  children: ReactNode;
};

export function AppProviders({ children }: Props) {
  const [queryClient] = useState(createQueryClient);

  return (
    <SafeAreaProvider>
      <AppThemeProvider>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </AppThemeProvider>
    </SafeAreaProvider>
  );
}
