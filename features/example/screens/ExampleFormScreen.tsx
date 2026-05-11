import { View } from 'react-native'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { exampleSchema, type ExampleFormData } from '../schema/example.schema'
import { useCreateExample } from '../hooks/useExample'

export function ExampleFormScreen() {
  const { mutate, isPending } = useCreateExample()
  const { handleSubmit } = useForm<ExampleFormData>({
    resolver: zodResolver(exampleSchema),
  })

  const onSubmit = (data: ExampleFormData) => {
    mutate(data)
  }

  return (
    <View className="flex-1 bg-background p-4" />
  )
}
