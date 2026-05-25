import type { AppLanguage, TranslationDictionary } from "./types";

export const defaultLanguage: AppLanguage = "pt-BR";

export const translations: Record<AppLanguage, TranslationDictionary> = {
  "pt-BR": {
    app: {
      notFoundTitle: "Página não encontrada",
    },
    home: {
      components: "Componentes",
      actionPrompt: "O que deseja fazer?",
      formLabel: "Formulário",
      formDescription: "Formulário Wizard",
      languageToggle: "Trocar idioma",
    },
    notFound: {
      heading: "Oops! Página não encontrada",
      description: "A tela que você tentou acessar não existe ou foi movida.",
      backHome: "Voltar para o início",
    },
  },
  "en-US": {
    app: {
      notFoundTitle: "Page not found",
    },
    home: {
      components: "Components",
      actionPrompt: "What do you want to do?",
      formLabel: "Form",
      formDescription: "Wizard form",
      languageToggle: "Change language",
    },
    notFound: {
      heading: "Oops! Page not found",
      description: "The screen you tried to access does not exist or was moved.",
      backHome: "Back to home",
    },
  },
};
