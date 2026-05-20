import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type WizardFormData, type WizardFormInput, wizardSchema } from '../schema/wizard.schema'
import { useWizardStore } from '../store/wizard.store'
import { useRouter } from 'expo-router'

const stepFields: (keyof WizardFormInput)[][] = [
  ['fullName', 'email'],
  ['age', 'occupation'],
  ['city', 'goals'],
]

const totalSteps = stepFields.length

export function useWizard() {
  const { formData, currentStep, setCurrentStep, setFormData, reset } = useWizardStore()
  const router = useRouter()

  const form = useForm<WizardFormInput, unknown, WizardFormData>({
    resolver: zodResolver(wizardSchema),
    defaultValues: {
      fullName: formData.fullName ?? '',
      email: formData.email ?? '',
      age: formData.age,
      occupation: formData.occupation ?? '',
      city: formData.city ?? '',
      goals: formData.goals ?? '',
    },
  })

  useEffect(() => {
    const subscription = form.watch((values) => {
      setFormData(values)
    })

    return () => subscription.unsubscribe()
  }, [form, setFormData])

  const isLastStep = currentStep === totalSteps - 1
  const isFirstStep = currentStep === 0

  const currentFields = useMemo(() => stepFields[currentStep], [currentStep])

  const nextStep = async () => {
    const isValid = await form.trigger(currentFields)
    if (!isValid || isLastStep) return false
    setCurrentStep(currentStep + 1)
    return true
  }

  const prevStep = () => {
    if (isFirstStep) return
    setCurrentStep(currentStep - 1)
  }

  const submit = form.handleSubmit((data) => {
    setFormData(data)
    router.push('/home')
  })

  return {
    form,
    currentStep,
    totalSteps,
    isLastStep,
    isFirstStep,
    setCurrentStep,
    nextStep,
    prevStep,
    submit,
    reset,
  }
}
