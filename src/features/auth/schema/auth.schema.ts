import { z } from 'zod'

export const authSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

export type AuthFormData = z.infer<typeof authSchema>
