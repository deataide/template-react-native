import { Text, TouchableOpacity, View } from 'react-native'
import Button from '@/shared/components/ui/Button'
import { WizardStepIndicator } from './WizardStepIndicator'

interface FormWizardProps {
  stepIndex: number
  totalSteps: number
  stepLabels: string[]
  onNext: () => void
  onBack: () => void
  onReset: () => void
  isFirstStep: boolean
  isLastStep: boolean
  children: React.ReactNode
}

export function FormWizard({
  stepIndex,
  totalSteps,
  stepLabels,
  onNext,
  onBack,
  onReset,
  isFirstStep,
  isLastStep,
  children,
}: FormWizardProps) {
  return (
    <View className="flex-1 bg-background">
      <View className="bg-primary justify-center px-6 pt-16 pb-10">
        <Text className="mb-1 text-xs font-semibold uppercase tracking-widest text-text-primary">
          Etapa {stepIndex + 1} de {totalSteps}
        </Text>
        <Text className="text-2xl font-bold text-text-primary">{stepLabels[stepIndex]}</Text>
        <Text className="mt-1.5 text-sm leading-relaxed text-text-secondary">
          Preencha os campos abaixo para continuar.
        </Text>

        <View className="mt-8 gap-2">
          <View className="flex-row gap-1.5">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <View
                key={i}
                className="h-1 flex-1 overflow-hidden rounded-full"
                style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
              >
                {i <= stepIndex && <View className="h-full w-full rounded-full bg-white" />}
              </View>
            ))}
          </View>
        </View>
      </View>

      <View
        className="mx-4 -mt-4 flex-1 rounded-2xl bg-background p-5"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.06,
          shadowRadius: 12,
          elevation: 4,
        }}
      >
        {children}

        <View className="mt-auto flex-row items-center gap-3 pt-4">
          {!isFirstStep ? (
            <TouchableOpacity
              onPress={onBack}
              activeOpacity={0.7}
              className="flex-row items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-5 py-3.5"
            >
              <Text className="text-base font-medium text-text-secondary">←</Text>
              <Text className="text-sm font-medium text-text-secondary">Voltar</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={onReset}
              activeOpacity={0.7}
              className="flex-row items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-5 py-3.5"
            >
              <Text className="text-base text-text-secondary">↺</Text>
              <Text className="text-sm font-medium text-text-secondary">Limpar</Text>
            </TouchableOpacity>
          )}

          <View className="flex-1">
            <Button onPress={onNext} title={isLastStep ? '✓  Concluir' : 'Próxima etapa  →'} />
          </View>
        </View>
      </View>

      <View className="pb-6 pt-3">
        <WizardStepIndicator currentStep={stepIndex} totalSteps={totalSteps} />
      </View>
    </View>
  )
}
