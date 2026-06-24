# 🚗 Arreda - Frontend do Sistema de Caronas

O **Arreda Frontend** é a interface web da plataforma de gestão de caronas desenvolvida por alunos do IFMG. A aplicação proporciona uma experiência moderna, responsiva e intuitiva para motoristas e passageiros interagirem com o sistema.

Construído com **Vue 3**, o projeto prioriza performance, organização em componentes e integração eficiente com a API backend.

---

## 📋 Sobre o Projeto

O frontend do Arreda é responsável por toda a experiência do usuário, permitindo:

* Cadastro e autenticação de usuários
* Visualização e criação de caronas
* Reserva de vagas em viagens
* Interação com dados em tempo real via API

O foco é garantir **usabilidade, acessibilidade e fluidez** na navegação.

---

## 🛠️ Tecnologias Utilizadas

* **Framework:** Vue 3
* **Linguagem:** JavaScript
* **Estilização:** Tailwind CSS
* **Consumo de API:** Axios
* **Gerenciador de Pacotes:** npm

---

## 🗺️ Roadmap de Desenvolvimento (ROADMAP.md)

Para acompanhar a evolução da interface:

* Organização das telas (Login, Dashboard, Caronas, Reservas)
* Componentização da aplicação
* Melhorias de UX/UI
* Integração completa com o backend

---

## 🏗️ Arquitetura do Frontend

A aplicação segue uma arquitetura baseada em componentes:

* **components/** → Componentes reutilizáveis
* **views/** → Páginas da aplicação
* **services/** → Comunicação com API (Axios)
* **router/** → Gerenciamento de rotas
* **store/** (se aplicável) → Gerenciamento de estado

Boas práticas adotadas:

* Separação de responsabilidades
* Reutilização de componentes
* Organização modular
* Padronização de chamadas HTTP

---

## 🔐 Integração com Backend

O frontend consome a API do backend (Spring Boot) utilizando Axios.

Exemplo de configuração:

```javascript
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/api",
});
```

Para rotas protegidas:

```javascript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

* Node.js instalado (recomendado versão 18+)
* npm ou yarn
* Backend rodando localmente

---

### Passos para rodar

Clone o repositório:

```bash
git clone https://github.com/SEU_USUARIO/arreda-frontend.git
```

Acesse a pasta do projeto:

```bash
cd arreda-frontend
```

Instale as dependências:

```bash
npm install
```

Rode o projeto:

```bash
npm run dev
```

A aplicação estará disponível em:

```bash
http://localhost:5173
```

---

## 🔗 Integração com API

Certifique-se de que o backend está rodando em:

```bash
http://localhost:8080
```

Caso necessário, ajuste a baseURL no Axios.

---

## 🎨 Padrões de UI

* Utilização de **Tailwind CSS** para estilização rápida e consistente
* Layout responsivo (mobile-first)
* Componentes reutilizáveis
* Feedback visual para ações do usuário (loading, erros, sucesso)

---

## 🤝 Diretrizes de Contribuição (COMMIT_GUIDE.md)

Seguimos o mesmo padrão do backend:

* **feat:** nova funcionalidade
* **fix:** correção de bug
* **docs:** documentação
* **refactor:** melhoria de código
* **style:** ajustes visuais

Fluxo:

1. Criar branch
2. Desenvolver feature
3. Commit padronizado
4. Abrir Pull Request

---

## 👥 Equipe

* Carlos Eduardo - Líder da equipe
* João Vieira - Responsável técnico
* João Vitor - Responsável pela apresentação
* Victor Fernandes - Responsável pela documentação

---
