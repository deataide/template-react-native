import React from "react";
import { TouchableOpacity, Text } from "react-native";

const Button: React.FC<{ onPress: () => void; title: string }> = ({
  onPress,
  title,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="rounded-xl bg-primary px-4 py-3 border-2 border-primary active:bg-primary/80"
    >
      <Text className="font-medium text-text-primary">{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
