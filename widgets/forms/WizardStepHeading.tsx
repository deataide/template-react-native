import { Text, View } from 'react-native'

interface WizardStepHeadingProps {
  title: string
  subtitle: string
}

export function WizardStepHeading({ title, subtitle }: WizardStepHeadingProps) {
  return (
    <View className="mb-5">
      <Text className="text-base font-bold text-text-primary">{title}</Text>
      <Text className="mt-0.5 text-xs text-text-secondary">{subtitle}</Text>
    </View>
  )
}
