import { Link, Stack } from "expo-router";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Página não encontrada" }} />

      <View className="flex-1 bg-background justify-center items-center p-6 w-full align-self-center align-center">
        <View className="bg-error/10 p-6 rounded-full mb-6">
          <Ionicons name="alert-circle-outline" size={80} color="#51e78b" />
        </View>

        <Text className="text-yellow-400text-2xl font-bold text-center mb-2">
          Oops! Página não encontrada
        </Text>

        <Text className="text-secondary text-base text-center mb-8 opacity-90">
          A tela que você tentou acessar não existe ou foi movida.
        </Text>

        <Link
          href="/"
          className="bg-primary py-3.5 px-7 rounded-xl overflow-hidden"
        >
          <Text className="text-text-primary font-bold text-base text-center margin-top-2 border-s-orange-400">
            Voltar para o início
          </Text>
        </Link>
      </View>
    </>
  );
}
