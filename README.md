# Expo Native Template

Template profissional para desenvolvimento **React Native + Expo** utilizando uma arquitetura moderna, escalável e preparada para times e projetos reais.

Este projeto já nasce organizado com **Feature Architecture**, automações via CLI e documentação pensada inclusive para uso com **IA Agents**.

---

# Stack Tecnológica

## Core

* Expo SDK 54
* React 19
* React Native 0.81
* Expo Router (file-based routing)

Plataformas suportadas:

* Android
* iOS
* Web

---

## Estado da Aplicação

| Tipo              | Tecnologia     |
| ----------------- | -------------- |
| Server State      | TanStack Query |
| Client State      | Zustand        |

Separação clara entre:

* **dados do backend**
* **estado local da UI**
* **configuração global**

---

## UI & Design System

* NativeWind (Tailwind CSS)
* Theme System (Light / Dark)
* Tokens centralizados
* Lucide Icons
---

## 🧾 Forms & Validação

* React Hook Form
* Zod
* Tipagem automática

---

## Comunicação HTTP

* Axios
* Cliente HTTP centralizado
* Interceptors globais
  
---

# Arquitetura do Projeto

Estrutura pensada para **escala real**.

```bash
.
├── app/                # Rotas (Expo Router)
├── features/           # Módulos isolados
├── shared/             # Código reutilizável
├── widgets/            # Componentes compostos de UI
├── services/           # HTTP, interceptors e integrações externas
├── assets/             # imagens, fontes, ícones
├── docs/               # documentação do projeto
├── scripts/            # CLIs internas
│
├── AGENTS.md           # contexto para IA
├── ARCHITECTURE.md     # documentação arquitetural
└── README.md
```

---

# Features (Domain Driven)

Cada funcionalidade vive isolada:

```bash
features/product/
 ├── api/
 ├── hooks/
 ├── screens/
 ├── schema/
 ├── store/
 ├── types/
 └── index.ts
```
---

# Pasta `shared`

Código reutilizável global.

```bash
shared/
 ├── components/   # componentes reutilizáveis
 ├── config/       # configs globais
 ├── constants/    # constantes do sistema
 ├── hooks/        # hooks compartilhados
 ├── providers/    # providers globais
 ├── theme/        # tokens e tema Tailwind
 ├── types/        # tipos globais
 └── utils/        # helpers
```

Regra:

 **shared NÃO conhece features**

---

# Widgets

```bash
widgets/
```

Componentes maiores compostos por múltiplos componentes.

Exemplos:

* Bottom Navigation
* Header App
* Layouts
* Containers

Diferença:

| Tipo              | Uso                     |
| ----------------- | ----------------------- |
| shared/components | componente reutilizável |
| widgets           | bloco de UI completo    |

---

# Services

```bash
services/
 ├── http.ts
 └── interceptors/
```

Responsável por:

* Cliente Axios
* Interceptors
* Auth handling
* Refresh token
* Integrações externas

 Features **NUNCA** usam axios direto.

---

# Docs

```bash
docs/
```

Documentação viva do projeto:

* padrões internos
* decisões técnicas
* guias de desenvolvimento

---

# AI-Ready Structure

Arquivos na raiz:

```
AGENTS.md
ARCHITECTURE.md
```

Servem para:

* fornecer contexto arquitetural para IA
* acelerar geração de código
* padronizar contribuições automáticas

---

# Scripts

```bash
scripts/
```

Automação interna do template.

Scripts disponíveis:

| Script         | Função            |
| -------------- | ----------------- |
| feature        | cria nova feature |
| feature:list   | lista features    |
| feature:delete | remove feature    |

---

# Como Rodar o Projeto

## 1️⃣ Instalar dependências

```bash
npm install
```

ou

```bash
yarn
```

---

## 2️⃣ Iniciar servidor Expo

```bash
npm start
```

Abre o Expo Dev Server.

---

## 3️⃣ Executar plataformas

### Android

```bash
npm run android
```

Requisitos:

* Android Studio
* Emulator ou dispositivo físico

---

### iOS (MacOS)

```bash
npm run ios
```

Requisitos:

* Xcode instalado

---

### Web

```bash
npm run web
```

---

### Rodar no celular físico

1. Instale **Expo Go**
2. Execute:

```bash
npm start
```

3. Escaneie o QR Code.

---

# 🧩 Feature Generator CLI

Cria módulos completos automaticamente.

## Criar feature

```bash
npm run feature users -- --all
```

Flags:

| Flag    | Gera                 |
| ------- | -------------------- |
| --crud  | API + TanStack Query |
| --form  | Form + Zod           |
| --store | Zustand Store        |
| --all   | tudo                 |

---

## Listar features

```bash
npm run feature:list
```

---

## Remover feature

```bash
npm run feature:delete users
```

---

# Filosofia

Este template aplica padrões usados em aplicações enterprise:

* Feature Driven Architecture
* Server State separado
* UI State isolado
* HTTP centralizado
* Theme System desacoplado
* Automação por CLI
* Preparado para IA

---

