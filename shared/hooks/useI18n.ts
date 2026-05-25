import { translations } from "@/shared/i18n/translations";
import { useLanguageStore } from "@/shared/stores/language.store";

export function useI18n() {
  const { language, setLanguage, toggleLanguage } = useLanguageStore();
  const dictionary = translations[language];

  return {
    language,
    setLanguage,
    toggleLanguage,
    t: dictionary,
  };
}
