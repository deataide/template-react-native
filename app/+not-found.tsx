import { Link, Stack } from "expo-router";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useI18n } from "@/shared/hooks/useI18n";

export default function NotFoundScreen() {
  const { t } = useI18n();

  return (
    <>
      <Stack.Screen options={{ title: t.app.notFoundTitle }} />

      <View className="flex-1 bg-background justify-center items-center p-6 w-full align-self-center align-center">
        <View className="bg-error/10 p-6 rounded-full mb-6">
          <Ionicons name="alert-circle-outline" size={80} color="#51e78b" />
        </View>

        <Text className="text-yellow-400text-2xl font-bold text-center mb-2">{t.notFound.heading}</Text>

        <Text className="text-secondary text-base text-center mb-8 opacity-90">
          {t.notFound.description}
        </Text>

        <Link
          href="/"
          className="bg-primary py-3.5 px-7 rounded-xl overflow-hidden"
        >
          <Text className="text-text-primary font-bold text-base text-center margin-top-2 border-s-orange-400">
            {t.notFound.backHome}
          </Text>
        </Link>
      </View>
    </>
  );
}
