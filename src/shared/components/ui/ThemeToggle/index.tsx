import { useTheme } from "@shared/hooks/useTheme";
import { useEffect, useRef } from "react";
import { Animated, Pressable, Text } from "react-native";

export const ThemeToggle = () => {
  const { isDark, toggleTheme, theme } = useTheme();
  const translateX = useRef(new Animated.Value(isDark ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: isDark ? 1 : 0,
      useNativeDriver: true,
      damping: 15,
      stiffness: 120,
    }).start();
  }, [isDark, translateX]);

  const knobTranslate = translateX.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 26],
  });

  return (
    <Pressable
      onPress={toggleTheme}
      accessibilityLabel={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      style={{
        width: 56,
        height: 30,
        borderRadius: 999,
        backgroundColor: isDark ? `${theme.colors.primary}30` : `${theme.colors.accent}30`,
        borderWidth: 1,
        borderColor: isDark ? `${theme.colors.primary}50` : `${theme.colors.accent}50`,
        justifyContent: "center",
      }}
    >
      <Animated.View
        style={{
          width: 26,
          height: 26,
          borderRadius: 999,
          backgroundColor: isDark ? theme.colors.surface : theme.colors.surface,
          alignItems: "center",
          justifyContent: "center",
          transform: [{ translateX: knobTranslate }],
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <Text className="text-sm">{isDark ? "🌙" : "☀️"}</Text>
      </Animated.View>
    </Pressable>
  );
};
