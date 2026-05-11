# Expo Native Template

Template moderno para desenvolvimento **React Native + Expo** com arquitetura escalável baseada em **Feature-Driven Design**, preparado para aplicações reais de produção.

Este projeto foi criado para eliminar boilerplate repetitivo e já entregar uma base **profissional, organizada e performática**.

---

## Tecnologias

### Core

* **Expo SDK 54**
* **React 19**
* **React Native 0.81**
* **Expo Router (File-based routing)**

Compatível com:

* Android
* iOS
* Web

---

### Gerenciamento de Estado

| Tipo de Estado        | Tecnologia     |
| --------------------- | -------------- |
| Dados do backend      | TanStack Query |
| estado local          | Zustand        |

Separação clara entre **Server State** e **Client State**.

---

### UI & Estilização

* NativeWind (Tailwind CSS)
* Dark / Light Theme Ready
* Lucide Icons
* Expo Vector Icons
* Layout responsivo

---

### 🧾 Formulários

* React Hook Form
* Zod Validation
* Tipagem automática

---

### API Layer

* Axios
* Service Layer isolada
* Hooks com TanStack Query

---

## Arquitetura

Estrutura baseada em **Feature Architecture**:

```

 app/            → rotas (expo-router)
 features/       → módulos isolados
 services/       → http client e interceptors
 widgets/
 shared/
 │   ├── components/
 │   ├── hooks/
 │   ├── providers/
 │   └── stores/
 │   └── config/
 │   └── types/
 │   └── utils/
 │   └── theme/
 │   └── constants/

```

Cada feature é independente:

```
features/users/
 ├── api/
 ├── hooks/
 ├── screens/
 ├── schema/
 ├── store/
 ├── types/
 └── index.ts
```

---

## Como rodar o projeto

### 1️⃣ Clonar o repositório

```
git clone <repo-url>
cd native
```

---

### 2️⃣ Instalar dependências

```
npm install
```

ou

```
yarn
```

---

### 3️⃣ Iniciar o projeto

```
npm start
```

Isso abrirá o **Expo Dev Server**.

---

### 4️⃣ Executar em cada plataforma

#### Android

Requer:

* Android Studio instalado
* Emulator rodando **ou** celular conectado

```
npm run android
```

---

#### iOS (MacOS)

Requer:

* Xcode instalado

```
npm run ios
```

---

#### Web

```
npm run web
```

---

### Rodar no celular físico

1. Instale o **Expo Go**:

   * Android → Play Store
   * iOS → App Store

2. Execute:

```
npm start
```

3. Escaneie o QR Code exibido no terminal.

---

## Feature Generator CLI

O template possui um CLI interno para gerar módulos automaticamente.

### Criar feature

```
npm run feature users -- --all
```

Flags:

| Flag      | Descrição            |
| --------- | -------------------- |
| `--crud`  | API + hooks TanStack |
| `--form`  | Form + Zod           |
| `--store` | Store Zustand        |
| `--all`   | Gera tudo            |

---

### Listar features

```
npm run feature:list
```

---

### Remover feature

```
npm run feature:delete users
```

---

## Providers Globais

Centralizados em:

```
app/shared/providers/
```

Inclui:

* Theme Provider
* Query Client Provider
* App Providers

---

## Scripts Disponíveis

```
npm start        → inicia o projeto
npm run android  → abre Android
npm run ios      → abre iOS
npm run web      → versão web
npm run lint     → linting
npm run feature
npm run feature:list 
npm run feature:delete    
```

---

## Filosofia do Template

* Server State separado do Client State
* Features isoladas
* Routing baseado em arquivos
* Providers centralizados
* Escalabilidade desde o primeiro commit

Ideal para:

* SaaS Mobile
* Super Apps
* MVPs profissionais
* Apps enterprise

---

## Stack Resumida

* Expo Router
* TanStack Query
* Zustand
* NativeWind
* React Hook Form
* Zod
* Axios
* TypeScript
