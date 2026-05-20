import { Text, View } from 'react-native'

interface WizardStepIndicatorProps {
  currentStep: number
  totalSteps: number
}

export function WizardStepIndicator({ currentStep, totalSteps }: WizardStepIndicatorProps) {
  return (
    <View className="border-t border-border bg-surface px-4 py-3">
      <Text className="text-center text-body-sm text-text-secondary">
        Etapa {currentStep + 1} de {totalSteps}
      </Text>
      <View className="mt-3 flex-row gap-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <View
            key={index}
            className={`h-2 flex-1 rounded-full ${index <= currentStep ? 'bg-primary' : 'bg-disabled-bg'}`}
          />
        ))}
      </View>
    </View>
  )
}
