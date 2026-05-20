import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import { View } from 'react-native'
import type { WizardFormData, WizardFormInput } from '../schema/wizard.schema'
import { StyledInput } from '@/shared/components/ui/StyledInput'
import { FieldWrapper } from '@/widgets/forms/WizardField'
import { WizardStepHeading } from '@/widgets/forms/WizardStepHeading'

interface WizardStepFieldsProps {
  control: Control<WizardFormInput, unknown, WizardFormData>
  errors: FieldErrors<WizardFormInput>
  step: number
}

export function WizardStepFields({ control, errors, step }: WizardStepFieldsProps) {
  if (step === 0) {
    return (
      <View className="gap-4">
        <WizardStepHeading title="Quem é você?" subtitle="Precisamos saber um pouco sobre você." />

        <FieldWrapper icon="👤" label="Nome completo" error={errors.fullName?.message}>
          <Controller
            control={control}
            name="fullName"
            render={({ field: { value, onChange } }) => (
              <StyledInput
                value={value}
                onChange={onChange}
                placeholder="Digite seu nome"
                hasError={!!errors.fullName}
              />
            )}
          />
        </FieldWrapper>

        <FieldWrapper icon="✉️" label="E-mail" error={errors.email?.message}>
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <StyledInput
                value={value}
                onChange={onChange}
                placeholder="nome@email.com"
                hasError={!!errors.email}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />
        </FieldWrapper>
      </View>
    )
  }

  if (step === 1) {
    return (
      <View className="gap-4">
        <WizardStepHeading title="Seus dados" subtitle="Nos conte um pouco mais sobre você." />

        <FieldWrapper icon="🎂" label="Idade" error={errors.age?.message}>
          <Controller
            control={control}
            name="age"
            render={({ field: { value, onChange } }) => (
              <StyledInput
                value={value ? String(value) : ''}
                onChange={onChange}
                placeholder="Ex: 28"
                hasError={!!errors.age}
                keyboardType="number-pad"
              />
            )}
          />
        </FieldWrapper>

        <FieldWrapper icon="💼" label="Profissão" error={errors.occupation?.message}>
          <Controller
            control={control}
            name="occupation"
            render={({ field: { value, onChange } }) => (
              <StyledInput
                value={value}
                onChange={onChange}
                placeholder="Ex: Product Designer"
                hasError={!!errors.occupation}
              />
            )}
          />
        </FieldWrapper>
      </View>
    )
  }

  return (
    <View className="gap-4">
      <WizardStepHeading title="Localização e metas" subtitle="Quase lá — só mais dois campos!" />

      <FieldWrapper icon="📍" label="Cidade" error={errors.city?.message}>
        <Controller
          control={control}
          name="city"
          render={({ field: { value, onChange } }) => (
            <StyledInput
              value={value}
              onChange={onChange}
              placeholder="Ex: São Paulo"
              hasError={!!errors.city}
            />
          )}
        />
      </FieldWrapper>

      <FieldWrapper icon="🎯" label="Objetivo" error={errors.goals?.message}>
        <Controller
          control={control}
          name="goals"
          render={({ field: { value, onChange } }) => (
            <StyledInput
              value={value}
              onChange={onChange}
              placeholder="O que você quer alcançar?"
              hasError={!!errors.goals}
              multiline
              numberOfLines={4}
            />
          )}
        />
      </FieldWrapper>
    </View>
  )
}
