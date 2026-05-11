import { z } from 'zod'

const envSchema = z.object({
  EXPO_PUBLIC_API_URL: z.string().url('EXPO_PUBLIC_API_URL deve ser uma URL válida'),
  EXPO_PUBLIC_APP_ENV: z.enum(['development', 'staging', 'production']).default('development'),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error('❌ Variáveis de ambiente inválidas:')
  parsed.error.issues.forEach((issue) => {
    console.error(`  ${issue.path.join('.')}: ${issue.message}`)
  })
  throw new Error('Variáveis de ambiente inválidas. Verifique seu .env')
}

export const env = parsed.data