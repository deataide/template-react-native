import { COLORS } from "@/shared/constants/colors";
import { useTheme } from "@/shared/hooks/useTheme";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { LucideIcon } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

export type TabConfig = {
  name: string;
  label: string;
  Icon: LucideIcon;
};

type BottomNavProps = BottomTabBarProps & {
  tabs: TabConfig[];
};

export function BottomNav({ state, navigation, tabs }: BottomNavProps) {
  const { isDark } = useTheme();
  const colors = isDark ? COLORS.dark : COLORS.light;

  return (
    <View className="absolute bottom-6 left-6 right-6">
      <View
        className="flex-row items-center justify-between bg-surface border border-border px-4 py-3 rounded-3xl"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: isDark ? 0.4 : 0.12,
          shadowRadius: 24,
          elevation: 12,
        }}
      >
        {tabs.map(({ label, name, Icon }, index) => {
          const active = state.index === index;

          return (
            <Pressable
              key={name}
              onPress={() => navigation.navigate(name)}
              className="items-center flex-1 gap-1"
            >
              <View
                className={`w-12 h-8 rounded-2xl items-center justify-center ${
                  active ? "bg-primary/10" : "bg-transparent"
                }`}
              >
                <Icon
                  size={20}
                  strokeWidth={active ? 2.5 : 1.8}
                  color={active ? colors.primary : colors.text.muted}
                />
              </View>

              <Text
                className={`text-caption font-medium ${
                  active ? "text-primary" : "text-text-muted"
                }`}
              >
                {label}
              </Text>

              {active && <View className="w-1 h-1 rounded-full bg-primary" />}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
