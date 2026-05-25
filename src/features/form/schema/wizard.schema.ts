import { z } from 'zod'

export const wizardSchema = z.object({
  fullName: z.string().min(3, 'Informe seu nome completo'),
  email: z.string().email('E-mail inválido'),
  age: z.coerce.number().int().min(18, 'Idade mínima: 18 anos'),
  occupation: z.string().min(2, 'Informe sua profissão'),
  city: z.string().min(2, 'Informe sua cidade'),
  goals: z.string().min(5, 'Descreva seus objetivos'),
})

export type WizardFormInput = z.input<typeof wizardSchema>
export type WizardFormData = z.output<typeof wizardSchema>
