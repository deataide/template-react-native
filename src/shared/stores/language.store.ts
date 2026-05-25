import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { AppLanguage } from "@shared/i18n/types";
import { defaultLanguage } from "@shared/i18n/translations";

type LanguageStore = {
  language: AppLanguage;
  setLanguage: (nextLanguage: AppLanguage) => void;
  toggleLanguage: () => void;
};

const nextLanguageMap: Record<AppLanguage, AppLanguage> = {
  "pt-BR": "en-US",
  "en-US": "pt-BR",
};

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set, get) => ({
      language: defaultLanguage,
      setLanguage: (nextLanguage) => set({ language: nextLanguage }),
      toggleLanguage: () => {
        const currentLanguage = get().language;
        set({ language: nextLanguageMap[currentLanguage] });
      },
    }),
    {
      name: "@app_language",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ language: state.language }),
    }
  )
);
