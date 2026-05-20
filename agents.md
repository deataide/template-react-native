# AI Agent Guidelines

Este documento define como agentes de IA devem trabalhar neste projeto.

---

## Arquitetura do Projeto

O projeto segue **Feature Driven Architecture** com:

- Expo Router para navegação baseada em arquivos
- TanStack Query para server state
- Zustand para estado global e local persistente
- React Hook Form + Zod para formulários e validação
- NativeWind + CSS vars para design system e tema

Toda implementação deve respeitar:

- isolamento de features
- separação entre UI e dados
- uso obrigatório do Feature Generator

---

## Regra Nº1 — Nunca criar código fora da arquitetura

Antes de criar qualquer funcionalidade:

1. verificar se a feature existe em `features/`
2. caso não exista → criar usando o script

```
node scripts/create-feature <feature>
```

Nunca criar pastas ou arquivos de feature manualmente.

---

## Regra Nº2 — Onde implementar cada coisa

### API

```
features/<feature>/api/
```

### Queries e Mutations

```
features/<feature>/hooks/
```

> Usar TanStack Query. Nunca chamar a API diretamente na tela.

### Estado local da feature

```
features/<feature>/store/
```

> Zustand. Se o estado precisar ser compartilhado entre features, mover para `shared/stores/`.

### Validação

```
features/<feature>/schema/
```

> Zod. Schemas compartilhados entre features vão em `shared/schemas/`.

### Componentes exclusivos da feature

```
features/<feature>/components/
```

### Telas

```
features/<feature>/screens/
```

### UI reutilizável entre features

```
shared/components/   → átomos (Button, Input, Card)
widgets/             → organismos compostos (BottomNav, Header)
```

---

## Regra Nº3 — Fluxo de Dados

A IA deve sempre seguir:

```
Screen
  ↓
Hook (TanStack Query)
  ↓
api/
  ↓
Backend
```

Nunca pular camadas. Telas não chamam `api/` diretamente.

---

## Regra Nº4 — Estado

A IA deve escolher a ferramenta correta:

| Tipo de Estado        | Ferramenta                  |
| --------------------- | --------------------------- |
| Server State          | TanStack Query              |
| Form State            | React Hook Form + Zod       |
| Cross Screen State    | Zustand                     |
| UI Local              | useState                    |
| Tema Global           | Zustand + persist           |

---

## Regra Nº5 — Imports

✅ permitido:

```
feature → shared/
feature → services/
feature → widgets/
```

❌ proibido:

```
feature → outra feature
```

Se duas features precisam compartilhar algo, extrair para `shared/`.

---

## Regra Nº6 — Componentes

Preferir:

- componentes pequenos e com responsabilidade única
- reutilização dentro da própria feature
- extrair para `shared/components/` apenas se reutilizado em múltiplas features
- extrair para `widgets/` se for um organismo composto (menu, navbar, header)

---

## Regra Nº7 — Navegação

Nunca registrar rotas manualmente.

Rotas são geradas automaticamente pelo Expo Router a partir dos arquivos em:

```
app/(tabs)/
app/(app)/
app/(public)/
```

---

## Regra Nº8 — Tema e Estilo

- Usar classes NativeWind (`className=`) para estilo
- Cores via CSS vars (`bg-background`, `text-text-primary`, `border-border`)
- Nunca usar cores hardcoded nos componentes — usar tokens do design system
- Cores de ícones (que não aceitam `className`) → importar de `COLORS` em `shared/theme/colors`

---

## Regra Nº9 — Código Gerado

Se código repetitivo aparecer entre features:

➡️ evoluir o script `create-feature` para gerar esse código automaticamente.

---

## Objetivo do Agente

A IA deve agir como **Senior Frontend Engineer**, priorizando:

- consistência arquitetural acima de soluções rápidas
- padrões já estabelecidos no projeto
- escalabilidade e baixo acoplamento
- evitar soluções ad-hoc que quebrem isolamento

---

## Resultado Esperado

- código previsível e consistente
- features independentes e isoladas
- fácil manutenção por qualquer dev do time
- crescimento sustentável do projeto