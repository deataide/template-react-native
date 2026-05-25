import { Text, View } from 'react-native'

export function FieldError({ error }: { error?: string }) {
  if (!error) return null
  return (
    <View className="mt-2 flex-row items-center gap-1.5">
      <Text className="text-error">⚠</Text>
      <Text className="text-body-sm text-error">{error}</Text>
    </View>
  )
}

export function FieldLabel({ icon, label }: { icon: string; label: string }) {
  return (
    <View className="mb-2.5 flex-row items-center gap-2">
      <View className="h-6 w-6 items-center justify-center rounded-md bg-primary/10">
        <Text className="text-xs">{icon}</Text>
      </View>
      <Text className="text-sm font-semibold text-text-primary">{label}</Text>
    </View>
  )
}

interface FieldWrapperProps {
  icon: string
  label: string
  error?: string
  children: React.ReactNode
}

export function FieldWrapper({ icon, label, error, children }: FieldWrapperProps) {
  return (
    <View>
      <FieldLabel icon={icon} label={label} />
      {children}
      <FieldError error={error} />
    </View>
  )
}
