import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import type { LucideIcon } from "lucide-react-native";
import { Pressable, View } from "react-native";

export type TabConfig = {
  name: string;
  label: string;
  Icon: LucideIcon;
};

type BottomNavProps = BottomTabBarProps & {
  tabs: TabConfig[];
};

export function BottomNav({ state, navigation, tabs }: BottomNavProps) {
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
                    ? "rgba(255,255,255,0.13)"
                    : "transparent",
                }}
              >
                <Icon
                  size={18}
                  strokeWidth={active ? 2.4 : 1.6}
                  color={active ? "#FFFFFF" : "rgba(255,255,255,0.40)"}
                />
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}