# CI Quality Guide

Este projeto usa o workflow `Quality` em `.github/workflows/quality.yml` para validar qualidade técnica automaticamente em pull requests e push para `main/master`.

## O que o CI valida

### 1) Detect Changes
Job: `Detect Changes`

Usa `dorny/paths-filter` para decidir quais jobs precisam rodar com base nos arquivos alterados:

- `app`: mudanças em `app/`, `src/`, configs principais e workflow
- `scripts`: mudanças em `scripts/`, `jest.scripts.config.js` e workflow
- `e2e`: mudanças em `e2e/`, configs Detox e `package.json`

### 2) App Quality
Job: `App Quality`

Roda quando `app == true`:

- `npm run lint` (inclui `lint:arch`)
- `npm run typecheck`
- `npm test -- --runInBand`
- `npx expo-doctor`

Objetivo: garantir arquitetura, tipagem, testes unitários e sanidade do setup Expo.

### 3) Script Quality
Job: `Script Quality`

Roda quando `scripts == true` ou `app == true`:

- `npm run test:scripts`

Objetivo: garantir estabilidade dos scripts de automação (ex.: `create-feature`).

### 4) E2E Smoke
Job: `E2E Smoke`

Roda quando `e2e == true` ou `app == true`.

Comportamento:

- se existir pasta `e2e/` e script `test:e2e` no `package.json`, executa:
  - `npm run test:e2e -- --grep @smoke`
- caso contrário, faz skip com mensagem informativa.

Objetivo: validar rapidamente fluxos críticos fim a fim quando suite E2E estiver configurada.

## Como reproduzir localmente

Execute os mesmos checks do CI:

```bash
npm run lint
npm run typecheck
npm test -- --runInBand
npm run test:scripts
```

Se houver E2E configurado:

```bash
npm run test:e2e -- --grep @smoke
```

## Observações

- O workflow usa `concurrency` para cancelar execuções antigas da mesma branch e reduzir fila no CI.
- `workflow_dispatch` permite rodar o workflow manualmente pela aba Actions no GitHub.
