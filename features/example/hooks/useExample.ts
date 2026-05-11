import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { exampleApi } from '../api/example.api'
import type { ExamplePayload } from '../types/example.types'

const KEY = ['examples'] as const

export function useExamples() {
  return useQuery({
    queryKey: KEY,
    queryFn: exampleApi.getAll,
  })
}

export function useExample(id: string) {
  return useQuery({
    queryKey: [...KEY, id],
    queryFn: () => exampleApi.getById(id),
    enabled: !!id,
  })
}

export function useCreateExample() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: ExamplePayload) => exampleApi.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  })
}

export function useUpdateExample() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ExamplePayload> }) =>
      exampleApi.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  })
}

export function useDeleteExample() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => exampleApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  })
}
