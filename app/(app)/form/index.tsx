import { Redirect } from 'expo-router'
import { useWizardStore } from '@/features/form/store/wizard.store'

export default function Form() {
  const currentStep = useWizardStore((state) => state.currentStep)
  const routeByStep = ['/form/step-1', '/form/step-2', '/form/step-3']
  const safeStep = Math.max(0, Math.min(currentStep, routeByStep.length - 1))

  return <Redirect href={routeByStep[safeStep] as '/form/step-1'} />
}
