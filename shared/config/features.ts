import { env } from '@/shared/config/env'

export const FEATURES = {
  isDev: env.EXPO_PUBLIC_APP_ENV === "development",
  isStaging: env.EXPO_PUBLIC_APP_ENV === "staging",
  isProd: env.EXPO_PUBLIC_APP_ENV === "production",

  enableLogs: env.EXPO_PUBLIC_APP_ENV !== "production",

  enableMockAPI: env.EXPO_PUBLIC_APP_ENV === "development",

  enableDevTools: env.EXPO_PUBLIC_APP_ENV === "development",

  enableAnalytics: env.EXPO_PUBLIC_APP_ENV !== "development",

  enableCrashlytics: env.EXPO_PUBLIC_APP_ENV === "production",
};