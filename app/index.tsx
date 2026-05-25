import { useAuthSession } from "@shared/hooks/useAuthSession";
import { Redirect } from "expo-router";
import { View } from "react-native";

export default function Initial() {
  const { hydrated, isAuthenticated } = useAuthSession();

  if (!hydrated) return <View className="flex-1 bg-background" />;

  if (!isAuthenticated) return <Redirect href="/(public)/login" />;

  return <Redirect href="/home" />;
}
