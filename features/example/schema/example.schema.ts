import { z } from 'zod'

export const exampleSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
})

export type ExampleFormData = z.infer<typeof exampleSchema>
