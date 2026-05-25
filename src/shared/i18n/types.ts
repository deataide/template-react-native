export type AppLanguage = "pt-BR" | "en-US";

export type TranslationDictionary = {
  app: {
    notFoundTitle: string;
  };
  home: {
    components: string;
    actionPrompt: string;
    formLabel: string;
    formDescription: string;
    languageToggle: string;
  };
  notFound: {
    heading: string;
    description: string;
    backHome: string;
  };
};
