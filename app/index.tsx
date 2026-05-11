import Button from "@/shared/components/ui/Button";
import { ThemeToggle } from "@/shared/components/ui/ThemeToggle";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

const Initial: React.FC = () => {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Button title="Go to Home" onPress={() => router.push("/home")} />
      <ThemeToggle />
    </View>
  );
};

export default Initial;
