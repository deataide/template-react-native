import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import type { LucideIcon } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { COLORS } from "@/shared/constants/colors";
import { useTheme } from "@/shared/hooks/useTheme";

export type TabConfig = {
  name: string;
  label: string;
  Icon: LucideIcon;
};

type BottomNavProps = BottomTabBarProps & {
  tabs: TabConfig[];
};

export function BottomNav({ state, navigation, tabs }: BottomNavProps) {
  const { theme } = useTheme();

  return (
    <View
      className="absolute bottom-6 left-0 right-0 items-center"
      style={{ pointerEvents: "box-none" }}
    >
      <View
        className="flex-row items-center rounded-full px-5 py-2 gap-1 elevation-sm bg-primary"
      >
        {tabs.map(({ name, Icon }, index) => {
          const active = state.index === index;

          return (
            <Pressable
              key={name}
              onPress={() => navigation.navigate(name)}
              className="items-center px-2.5"
            >
              <View
                className="w-10 h-[30px] rounded-full items-center justify-center"
                style={{
                  backgroundColor: active
                    ? theme.colors.overlay
                    : "transparent",
                }}
              >
                <Icon
                  size={18}
                  strokeWidth={active ? 2.4 : 1.6}
                  color={active ? COLORS.dark.text.primary : COLORS.dark.text.secondary}
                />
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
