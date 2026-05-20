module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./features/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./shared/**/*.{js,jsx,ts,tsx}",
    "./widgets/**/*.{js,jsx,ts,tsx}",
  ], presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--primary) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        background: "rgb(var(--background) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        text: {
          primary: "rgb(var(--text-primary) / <alpha-value>)",
          secondary: "rgb(var(--text-secondary) / <alpha-value>)",
          accent: "rgb(var(--text-accent) / <alpha-value>)",
          muted: "rgb(var(--text-muted) / <alpha-value>)",
        },
        disabled: {
          bg: "rgb(var(--disabled-bg) / <alpha-value>)",
          text: "rgb(var(--disabled-text) / <alpha-value>)",
        },
        success: "rgb(var(--success) / <alpha-value>)",
        warning: "rgb(var(--warning) / <alpha-value>)",
        error: "rgb(var(--error) / <alpha-value>)",
        info: "rgb(var(--info) / <alpha-value>)",
      },
      fontSize: {
        h1: ["32px", { fontWeight: "700", lineHeight: "40px" }],
        h2: ["24px", { fontWeight: "600", lineHeight: "32px" }],
        h3: ["20px", { fontWeight: "600", lineHeight: "28px" }],
        body: ["16px", { fontWeight: "400", lineHeight: "24px" }],
        "body-sm": ["14px", { fontWeight: "400", lineHeight: "20px" }],
        caption: ["12px", { fontWeight: "400", lineHeight: "16px" }],
        btn: ["16px", { fontWeight: "600", lineHeight: "24px" }],
      },
      fontFamily: {
        sans: ["Inter_400Regular"],
        medium: ["Inter_500Medium"],
        semibold: ["Inter_600SemiBold"],
        bold: ["Inter_700Bold"],
      },
    },
  },
  plugins: [],
}
