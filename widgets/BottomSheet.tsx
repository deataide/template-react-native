import React, { useRef, useEffect, useCallback } from "react";
import {
  View,
  Modal,
  Animated,
  PanResponder,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/shared/hooks/useTheme";
import { useThemeStore } from "@/shared/stores/theme.store";
import { cssVarsByTheme } from "@/shared/theme/cssVars";

export function BottomSheet({
  visible,
  onClose,
  children,
}: {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  const { isDark } = useThemeStore();
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const closedTranslateY = windowHeight + insets.bottom;
  const maxSheetHeight = Math.max(100, windowHeight - insets.top - 8);
  const defaultSheetHeight = Math.max(420, windowHeight * 0.88);
  const sheetHeight = Math.min(maxSheetHeight, defaultSheetHeight);

  const translateY = useRef(new Animated.Value(closedTranslateY)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const closeSheetRef = useRef<() => void>(() => {});

  const closeSheet = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: closedTranslateY,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => onClose());
  }, [closedTranslateY, onClose, backdropOpacity, translateY]);

  useEffect(() => {
    closeSheetRef.current = closeSheet;
  }, [closeSheet]);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      translateY.setValue(closedTranslateY);
      backdropOpacity.setValue(0);
    }
  }, [visible, closedTranslateY, backdropOpacity, translateY]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, g) => g.dy > 5,
      onPanResponderMove: (_, g) => {
        if (g.dy > 0) translateY.setValue(g.dy);
      },
      onPanResponderRelease: (_, g) => {
        if (g.dy > 120 || g.vy > 0.5) {
          closeSheetRef.current();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 4,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      navigationBarTranslucent
      presentationStyle="overFullScreen"
      onRequestClose={closeSheet}
    >
      <View
        className={isDark ? "flex-1 justify-end dark" : "flex-1 justify-end"}
        style={cssVarsByTheme[isDark ? "dark" : "light"]}
      >

        <Animated.View
          className="absolute inset-0"
          pointerEvents="none"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            opacity: backdropOpacity,
          }}
        />

        <Pressable className="absolute inset-0" onPress={closeSheet} />

        <Animated.View
          style={{
            backgroundColor: theme.colors.background,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            height: sheetHeight,
            maxHeight: maxSheetHeight,
            minHeight: 100,
            overflow: "hidden",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.08,
            shadowRadius: 10,
            elevation: 8,
            transform: [{ translateY }],
          }}
        >
          <View
            {...panResponder.panHandlers}
            className="items-center pt-3 pb-4"
          >
            <View
              className="w-10 h-1.5 rounded-full"
              style={{ backgroundColor: theme.colors.border }}
            />
          </View>

          {children}
        </Animated.View>

      </View>
    </Modal>
  );
}
