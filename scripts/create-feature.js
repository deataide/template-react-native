#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// -----------------------------
// args
// -----------------------------
const args = process.argv.slice(2)
const featureName = args[0]

if (!featureName) {
  console.log('Usage:')
  console.log('  node scripts/create-feature <feature> [flags]')
  console.log('')
  console.log('Flags:')
  console.log('  --crud   → gera api com getAll, getById, create, update, remove')
  console.log('  --form   → gera schema Zod + FormScreen')
  console.log('  --store  → gera store Zustand local')
  console.log('  --all    → ativa todos os flags')
  process.exit(1)
}

const flags = {
  crud:  args.includes('--crud'),
  form:  args.includes('--form'),
  store: args.includes('--store'),
  all:   args.includes('--all'),
}

if (flags.all) {
  flags.crud  = true
  flags.form  = true
  flags.store = true
}

const pascal = featureName.charAt(0).toUpperCase() + featureName.slice(1)
const camel  = featureName.charAt(0).toLowerCase() + featureName.slice(1)

// -----------------------------
// root detect
// -----------------------------
const hasSrc = fs.existsSync(path.join(process.cwd(), 'src'))
const ROOT = hasSrc ? path.join(process.cwd(), 'src') : process.cwd()

// app/ sempre na raiz do projeto (Expo Router)
const APP_ROOT    = process.cwd()
const FEATURE_DIR = path.join(ROOT, 'features', featureName)
const ROUTE_DIR   = path.join(APP_ROOT, 'app', '(app)', featureName)

if (fs.existsSync(FEATURE_DIR)) {
  console.error(`❌ Feature "${featureName}" já existe.`)
  process.exit(1)
}

// -----------------------------
// helper
// -----------------------------
function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, content)
}

// -----------------------------
// dirs base
// -----------------------------
;['api', 'hooks', 'screens', 'components', 'types', 'schema', 'store'].forEach(
  (dir) => fs.mkdirSync(path.join(FEATURE_DIR, dir), { recursive: true })
)

// -----------------------------
// TYPES
// -----------------------------
write(
  path.join(FEATURE_DIR, `types/${featureName}.types.ts`),
  `export interface ${pascal} {
  id: string
  name: string
  createdAt: string
}

export interface ${pascal}Payload {
  name: string
}
`
)

// -----------------------------
// API
// -----------------------------
if (flags.crud) {
  write(
    path.join(FEATURE_DIR, `api/${featureName}.api.ts`),
    `import { http } from '@/services/http'
import type { ${pascal}, ${pascal}Payload } from '../types/${featureName}.types'

export const ${camel}Api = {
  getAll: () =>
    http.get<${pascal}[]>('/${featureName}s').then((r) => r.data),

  getById: (id: string) =>
    http.get<${pascal}>(\`/${featureName}s/\${id}\`).then((r) => r.data),

  create: (data: ${pascal}Payload) =>
    http.post<${pascal}>('/${featureName}s', data).then((r) => r.data),

  update: (id: string, data: Partial<${pascal}Payload>) =>
    http.put<${pascal}>(\`/${featureName}s/\${id}\`, data).then((r) => r.data),

  remove: (id: string) =>
    http.delete(\`/${featureName}s/\${id}\`),
}
`
  )
}

// -----------------------------
// HOOKS (TanStack Query)
// -----------------------------
write(
  path.join(FEATURE_DIR, `hooks/use${pascal}.ts`),
  flags.crud
    ? `import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ${camel}Api } from '../api/${featureName}.api'
import type { ${pascal}Payload } from '../types/${featureName}.types'

const KEY = ['${featureName}s'] as const

export function use${pascal}s() {
  return useQuery({
    queryKey: KEY,
    queryFn: ${camel}Api.getAll,
  })
}

export function use${pascal}(id: string) {
  return useQuery({
    queryKey: [...KEY, id],
    queryFn: () => ${camel}Api.getById(id),
    enabled: !!id,
  })
}

export function useCreate${pascal}() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: ${pascal}Payload) => ${camel}Api.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  })
}

export function useUpdate${pascal}() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<${pascal}Payload> }) =>
      ${camel}Api.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  })
}

export function useDelete${pascal}() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => ${camel}Api.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  })
}
`
    : `// Adicione --crud para gerar hooks com TanStack Query
`
)

// -----------------------------
// STORE (Zustand)
// -----------------------------
if (flags.store) {
  write(
    path.join(FEATURE_DIR, `store/${featureName}.store.ts`),
    `import { create } from 'zustand'
import type { ${pascal}Payload } from '../types/${featureName}.types'

interface ${pascal}StoreState {
  form: Partial<${pascal}Payload>
  setForm: (data: Partial<${pascal}Payload>) => void
  reset: () => void
}

export const use${pascal}Store = create<${pascal}StoreState>((set) => ({
  form: {},
  setForm: (data) => set((s) => ({ form: { ...s.form, ...data } })),
  reset: () => set({ form: {} }),
}))
`
  )
}

// -----------------------------
// SCHEMA (Zod)
// -----------------------------
if (flags.form) {
  write(
    path.join(FEATURE_DIR, `schema/${featureName}.schema.ts`),
    `import { z } from 'zod'

export const ${camel}Schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
})

export type ${pascal}FormData = z.infer<typeof ${camel}Schema>
`
  )
}

// -----------------------------
// SCREENS
// -----------------------------
write(
  path.join(FEATURE_DIR, `screens/${pascal}ListScreen.tsx`),
  `import { View, Text } from 'react-native'
${flags.crud ? `import { use${pascal}s } from '../hooks/use${pascal}'` : ''}

export function ${pascal}ListScreen() {
  ${flags.crud ? `const { data, isLoading, isError, refetch } = use${pascal}s()

  if (isLoading) return <View className="flex-1 items-center justify-center"><Text className="text-text-primary">Carregando...</Text></View>
  if (isError)   return <View className="flex-1 items-center justify-center"><Text className="text-error">Erro ao carregar.</Text></View>` : ''}

  return (
    <View className="flex-1 bg-background p-4">
      <Text className="text-h2 font-bold text-text-primary">${pascal}</Text>
    </View>
  )
}
`
)

write(
  path.join(FEATURE_DIR, `screens/${pascal}DetailScreen.tsx`),
  `import { View, Text } from 'react-native'

export function ${pascal}DetailScreen() {
  return (
    <View className="flex-1 bg-background p-4">
      <Text className="text-h2 font-bold text-text-primary">${pascal} Detail</Text>
    </View>
  )
}
`
)

if (flags.form) {
  write(
    path.join(FEATURE_DIR, `screens/${pascal}FormScreen.tsx`),
    `import { View } from 'react-native'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ${camel}Schema, type ${pascal}FormData } from '../schema/${featureName}.schema'
${flags.crud ? `import { useCreate${pascal} } from '../hooks/use${pascal}'` : ''}

export function ${pascal}FormScreen() {
  ${flags.crud ? `const { mutate, isPending } = useCreate${pascal}()` : ''}
  const { handleSubmit } = useForm<${pascal}FormData>({
    resolver: zodResolver(${camel}Schema),
  })

  const onSubmit = (data: ${pascal}FormData) => {
    ${flags.crud ? `mutate(data)` : '// TODO: implementar submit'}
  }

  return (
    <View className="flex-1 bg-background p-4" />
  )
}
`
  )
}

// -----------------------------
// ROUTES (Expo Router)
// -----------------------------
write(
  path.join(ROUTE_DIR, 'index.tsx'),
  `import { ${pascal}ListScreen } from '@/features/${featureName}'

export default function Screen() {
  return <${pascal}ListScreen />
}
`
)

write(
  path.join(ROUTE_DIR, '[id].tsx'),
  `import { ${pascal}DetailScreen } from '@/features/${featureName}'

export default function Screen() {
  return <${pascal}DetailScreen />
}
`
)

if (flags.form) {
  write(
    path.join(ROUTE_DIR, 'create.tsx'),
    `import { ${pascal}FormScreen } from '@/features/${featureName}'

export default function Screen() {
  return <${pascal}FormScreen />
}
`
  )
}

// -----------------------------
// BARREL
// -----------------------------
const barrelExports = [
  `export * from './screens/${pascal}ListScreen'`,
  `export * from './screens/${pascal}DetailScreen'`,
  flags.form  ? `export * from './screens/${pascal}FormScreen'`  : null,
  flags.crud  ? `export * from './api/${featureName}.api'`       : null,
  `export * from './hooks/use${pascal}'`,
  `export * from './types/${featureName}.types'`,
  flags.form  ? `export * from './schema/${featureName}.schema'` : null,
  flags.store ? `export * from './store/${featureName}.store'`   : null,
]
  .filter(Boolean)
  .join('\n')

write(path.join(FEATURE_DIR, 'index.ts'), barrelExports + '\n')

// -----------------------------
// summary
// -----------------------------
console.log('')
console.log(`✅ Feature "${featureName}" criada com sucesso`)
console.log('')
console.log('Arquivos gerados:')
console.log(`  features/${featureName}/types/${featureName}.types.ts`)
if (flags.crud)  console.log(`  features/${featureName}/api/${featureName}.api.ts`)
console.log(`  features/${featureName}/hooks/use${pascal}.ts`)
if (flags.store) console.log(`  features/${featureName}/store/${featureName}.store.ts`)
if (flags.form)  console.log(`  features/${featureName}/schema/${featureName}.schema.ts`)
console.log(`  features/${featureName}/screens/${pascal}ListScreen.tsx`)
console.log(`  features/${featureName}/screens/${pascal}DetailScreen.tsx`)
if (flags.form)  console.log(`  features/${featureName}/screens/${pascal}FormScreen.tsx`)
console.log(`  app/(app)/${featureName}/index.tsx`)
console.log(`  app/(app)/${featureName}/[id].tsx`)
if (flags.form)  console.log(`  app/(app)/${featureName}/create.tsx`)
console.log('')