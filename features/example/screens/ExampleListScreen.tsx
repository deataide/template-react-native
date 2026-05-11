import { View, Text } from 'react-native'
import { useExamples } from '../hooks/useExample'

export function ExampleListScreen() {
  const { data, isLoading, isError, refetch } = useExamples()

  if (isLoading) return <View className="flex-1 items-center justify-center"><Text className="text-text-primary">Carregando...</Text></View>
  if (isError)   return <View className="flex-1 items-center justify-center"><Text className="text-error">Erro ao carregar.</Text></View>

  return (
    <View className="flex-1 bg-background p-4">
      <Text className="text-h2 font-bold text-text-primary">Example</Text>
    </View>
  )
}
