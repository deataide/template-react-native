import { useState } from "react"
import { TextInput } from "react-native"
import { useTheme } from "@/shared/hooks/useTheme"

interface StyledInputProps {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  hasError?: boolean
  keyboardType?: 'default' | 'email-address' | 'number-pad'
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  multiline?: boolean
  numberOfLines?: number
}

export function StyledInput({
  value,
  onChange,
  placeholder,
  hasError,
  keyboardType = 'default',
  autoCapitalize,
  multiline,
  numberOfLines,
}: StyledInputProps) {
  const [focused, setFocused] = useState(false)
  const { theme } = useTheme()

  const borderColor = hasError
    ? 'border-error bg-error/5'
    : focused
      ? 'border-primary bg-primary/5'
      : 'border-border bg-surface'

  return (
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      placeholderTextColor={theme.colors.text.muted}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      multiline={multiline}
      numberOfLines={numberOfLines}
      textAlignVertical={multiline ? 'top' : undefined}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={`rounded-xl border px-4 py-3.5 text-body text-text-primary ${borderColor} ${
        multiline ? 'min-h-28' : ''
      }`}
    />
  )
}
