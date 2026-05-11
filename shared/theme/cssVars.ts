import { vars } from "nativewind"
import { COLORS } from "../constants/colors"

function hex(color: string): string {
  const c = color.replace("#", "")
  const r = parseInt(c.substring(0, 2), 16)
  const g = parseInt(c.substring(2, 4), 16)
  const b = parseInt(c.substring(4, 6), 16)
  return `${r} ${g} ${b}`
}

function themeVars(mode: "light" | "dark") {
  const c = COLORS[mode]
  const f = COLORS.feedback

  return vars({
    "--primary": hex(c.primary),
    "--secondary": hex(c.secondary),
    "--accent": hex(c.accent),
    "--background": hex(c.background),
    "--surface": hex(c.surface),
    "--border": hex(c.border),
    "--text-primary": hex(c.text.primary),
    "--text-secondary": hex(c.text.secondary),
    "--text-accent": hex(c.text.accent),
    "--text-muted": hex(c.text.muted),
    "--disabled-bg": hex(c.disabled.background),
    "--disabled-text": hex(c.disabled.text),
    "--success": hex(f.success),
    "--warning": hex(f.warning),
    "--error": hex(f.error),
    "--info": hex(f.info),
  })
}

export const cssVarsByTheme = {
  light: themeVars("light"),
  dark: themeVars("dark"),
} as const