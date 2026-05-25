import type { LucideIcon } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

type IconActionProps = {
  Icon: LucideIcon;
  label: string;
  description?: string;
  onPress: () => void;
  color?: string;
  bgColor?: string;
};

export function IconAction({
  Icon,
  label,
  description,
  onPress,
  color = "#2BAE66",
}: IconActionProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-3 p-3 rounded-2xl active:opacity-70"
    >
      <View
        className="w-11 h-11 rounded-full items-center justify-center bg-surface"
      >
        <Icon size={20} color={color} strokeWidth={1.8} />
      </View>

      <View className="flex-1">
        <Text className="text-sm font-medium text-text-primary">{label}</Text>
        {description && (
          <Text className="text-xs text-text-muted mt-0.5">{description}</Text>
        )}
      </View>

      <View className="opacity-30">
        <Icon size={16} color={color} strokeWidth={2} />
      </View>
    </Pressable>
  );
}