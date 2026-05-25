import { Text, View } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { authSchema, type AuthFormData } from '../schema/auth.schema'
import { useLogin } from '../hooks/useAuth'
import { StyledInput } from '@shared/components/ui/StyledInput'
import Button from '@shared/components/ui/Button'
import { Screen } from '@shared/components/ui/Screen'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'

export function AuthFormScreen() {
  const { mutate, isPending, error, isSuccess } = useLogin()
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: 'demo@demo.com',
      password: '123456',
    },
  })

  const onSubmit = (data: AuthFormData) => {
    mutate(data)
  }

  useEffect(() => {
    if (isSuccess) {
      router.replace('/home')
    }
  }, [isSuccess, router])

  return (
    <Screen>
      <View className="flex-1 justify-center gap-4 bg-background px-6">
        <Text className="text-h2 font-bold text-text-primary">Entrar</Text>
        <Text className="text-body text-text-secondary">
          Use demo@demo.com e 123456
        </Text>

        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <StyledInput
              value={field.value}
              onChange={field.onChange}
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              hasError={Boolean(errors.email)}
            />
          )}
        />
        {errors.email && (
          <Text className="text-body text-error">{errors.email.message}</Text>
        )}

        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <StyledInput
              value={field.value}
              onChange={field.onChange}
              placeholder="Senha"
              autoCapitalize="none"
              secureTextEntry
              hasError={Boolean(errors.password)}
            />
          )}
        />
        {errors.password && (
          <Text className="text-body text-error">{errors.password.message}</Text>
        )}

        {error && (
          <Text className="text-body text-error">{error.message}</Text>
        )}

        <Button
          title={isPending ? 'Entrando...' : 'Entrar'}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </Screen>
  )
}
