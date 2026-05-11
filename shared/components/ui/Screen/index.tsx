import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View } from "react-native";
import React from "react";

type Props = {
  children: React.ReactNode;
  scroll?: boolean;
};

export function Screen({ children, scroll = false }: Props) {
  const content = scroll ? (
    <ScrollView className="flex-grow p-16" showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  ) : (
    <View className="flex-1">{children}</View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">{content}</SafeAreaView>
  );
}
