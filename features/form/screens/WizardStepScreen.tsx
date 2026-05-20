import { useEffect } from 'react'
import { View } from 'react-native'
import { useRouter } from 'expo-router'
import { useWizard } from '../hooks/useWizard'
import { WizardStepFields } from '../components/WizardStepFields'
import { FormWizard } from '@/widgets/forms/FormWizard'

interface WizardStepScreenProps {
  stepIndex: number
}

const stepRoutes = ['/form/step-1', '/form/step-2', '/form/step-3']
const backRoutes = [
  undefined,
  '/form/step-1',
  '/form/step-2',
]

const STEP_LABELS = ['Informações', 'Detalhes', 'Confirmação']

export function WizardStepScreen({ stepIndex }: WizardStepScreenProps) {
  const router = useRouter()
  const {
    form,
    totalSteps,
    isLastStep,
    isFirstStep,
    setCurrentStep,
    nextStep,
    prevStep,
    submit,
    reset,
  } = useWizard()

  useEffect(() => {
    setCurrentStep(stepIndex)
  }, [setCurrentStep, stepIndex])

  const onNext = async () => {
    if (isLastStep) {
      submit()
      return
    }
    const canGoNext = await nextStep()
    if (!canGoNext) return

    router.push(stepRoutes[stepIndex + 1] as '/form/step-1')
  }

  const onBack = () => {
    if (isFirstStep) {
      router.replace('/home')
      return
    }

    prevStep()
    const target = backRoutes[stepIndex] ?? stepRoutes[stepIndex - 1]
    router.push(target as '/form/step-1' | '/form/step-2')
  }

  return (
    <FormWizard
      stepIndex={stepIndex}
      totalSteps={totalSteps}
      stepLabels={STEP_LABELS}
      onNext={onNext}
      onBack={onBack}
      onReset={reset}
      isFirstStep={isFirstStep}
      isLastStep={isLastStep}
    >
      <View className="flex-1">
        <WizardStepFields
          step={stepIndex}
          control={form.control}
          errors={form.formState.errors}
        />
      </View>
    </FormWizard>
  )
}
