# Feature Generator Script

## Objetivo

O projeto utiliza um **Feature Generator CLI** para padronizar a criação de novos domínios da aplicação.

O objetivo é:

* evitar boilerplate manual
* manter arquitetura consistente
* acelerar desenvolvimento
* reduzir decisões repetidas

---

## Como criar uma feature

```bash
npm run feature <feature-name> -- <config>
```

### Exemplo

```bash
npm run feature <feature-name> -- <config>
```

---

## Estrutura gerada

```
features/
  supplier/
    api/
    hooks/
    screens/
    components/
    store/
    schema/
    types/
    index.ts
```

---

## O que o script cria automaticamente

### API Layer

* CRUD base
* integração com API client

### React Query

* query keys tipadas
* hooks `useQuery`
* hooks `useMutation`

### Store

* Zustand store para formulário

### Schema

* validação com Zod

### Screens

* List Screen
* Detail Screen

---

## Convenções

### Nome da feature

Sempre usar:

* singular
* lowercase

✅ `supplier`
✅ `product`
❌ `Suppliers`
❌ `ProductModule`

---

### Responsabilidade da feature

Cada feature é um **domínio isolado**.

Ela deve conter:

* API
* estado
* telas
* componentes próprios

---

## Fluxo recomendado

1. Criar feature
2. Ajustar types
3. Ajustar endpoints API
4. Criar UI
5. Finalizar

---

## Regra importante

⚠️ Nunca criar arquivos manualmente fora do padrão do script.

Se algo estiver faltando → evoluir o script.
