import { IconAction } from "@/shared/components/ui/IconAction";
import { useI18n } from "@/shared/hooks/useI18n";
import { useTheme } from "@/shared/hooks/useTheme";
import { BottomSheet } from "@/widgets/BottomSheet";
import { useRouter } from "expo-router";
import { List } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export function HomeScreen() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();
  const { t, language, toggleLanguage } = useI18n();

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Pressable
        onPress={() => setSheetOpen(true)}
        className="flex-row items-center gap-2 px-6 py-3 rounded-full active:opacity-80 bg-surface border border-border"
      >
        <Text className="text-text-primary text-sm font-medium">
          {t.home.components}
        </Text>
      </Pressable>

      <Pressable
        onPress={toggleLanguage}
        className="mt-3 flex-row items-center gap-2 px-6 py-3 rounded-full active:opacity-80 bg-surface border border-border"
      >
        <Text className="text-text-primary text-sm font-medium">
          {t.home.languageToggle} ({language})
        </Text>
      </Pressable>

      <BottomSheet visible={sheetOpen} onClose={() => setSheetOpen(false)}>
        <View className="px-4 gap-3">
          <Text className="text-sm font-medium text-text-primary text-center mb-1">
            {t.home.actionPrompt}
          </Text>

          <IconAction
            Icon={List}
            label={t.home.formLabel}
            description={t.home.formDescription}
            color={theme.colors.text.accent}
            onPress={() => {
              setSheetOpen(false);
              router.push("/form");
            }}
          />
        </View>
      </BottomSheet>
    </View>
  );
}
