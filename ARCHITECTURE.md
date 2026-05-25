# Frontend Architecture

## Filosofia

O projeto utiliza **Feature Driven Architecture** baseada em:

- Vertical Slice Architecture
- Domain Driven Design (Frontend)
- Clean Architecture principles

---

## Estrutura do Projeto

```
app/        → navegação (Expo Router)
assets/     → assets estáticos
src/features/ → domínios da aplicação
src/shared/   → código reutilizável e design system
src/widgets/  → componentes compostos de UI (BottomNav, Header, Sidebar)
src/services/ → integrações externas (API clients, SDKs)
scripts/    → scripts de automação (create-feature, etc)
docs/       → documentação
```

---

## Features

Cada pasta dentro de `src/features/` representa um domínio isolado.

Exemplo:

```
src/features/
  supplier/
  product/
  order/
```

Cada feature funciona como um **mini aplicativo independente**.

---

## Estrutura interna da feature

```
supplier/
│
├── api/          → comunicação com backend
├── hooks/        → TanStack Query hooks (queries e mutations)
├── store/        → estado local da feature (Zustand — não compartilhar entre features)
├── schema/       → validação Zod
├── screens/      → telas
├── components/   → UI exclusiva da feature
├── types/        → modelos TypeScript
└── index.ts      → barrel export
```

> Se um estado do `store/` precisar ser compartilhado entre features, mover para `src/shared/stores/`.

---

## Shared Layer

```
src/shared/
├── components/   → átomos reutilizáveis (Button, Input, Card, Badge...)
├── hooks/        → hooks genéricos (useDebounce, useTheme...)
├── stores/       → estado global (theme.store, auth.store...)
├── providers/    → providers globais (ThemeProvider...)
├── theme/        → design tokens (colors, cssVars, typography...)
├── schemas/      → schemas Zod compartilhados entre features
├── types/        → tipos e interfaces globais
└── utils/        → helpers e funções puras
```

> Nunca colocar lógica de domínio em `shared/`.

---

## Widgets Layer

```
src/widgets/
├── navigation/   → BottomNav, TabBar
├── header/       → AppHeader, SearchBar
└── sidebar/      → Drawer, Menu
```

> Diferença entre camadas de UI:
> - `src/shared/components/` → átomos (Button, Input)
> - `src/widgets/` → organismos compostos (BottomNav, Sidebar)
> - `src/features/X/components/` → UI exclusiva da feature X

---

## Regras Fundamentais

### 1. Feature Isolation

Features **não devem** importar outras features.

❌ errado

```
src/features/order → importa src/features/supplier
```

✅ correto

```
src/features/order → src/shared/  (abstrai a dependência)
```

---

### 2. Separação de Estado

| Tipo de Estado        | Ferramenta                  |
| --------------------- | --------------------------- |
| Server State          | TanStack Query              |
| Form State            | React Hook Form + Zod       |
| Cross Screen State    | Zustand                     |
| UI Local              | useState                    |
| Tema Global           | Zustand + persist           |

---

### 3. Fluxo de Dados

Telas nunca chamam a API diretamente — apenas hooks.

```
Screen → Hook (TanStack Query) → api/ → Backend
              ↓
        cache automático
              ↓
        invalidateQueries → refetch
```

---

### 4. Navegação

Expo Router gera rotas automaticamente a partir dos arquivos:

```
app/(tabs)/home.tsx   →   /home
app/(app)/supplier/index.tsx   →   /supplier
```

Nunca registrar rotas manualmente.

---

## Benefícios

- escalabilidade sem acoplamento
- onboarding rápido para novos devs
- baixo acoplamento entre domínios
- fácil manutenção e testabilidade