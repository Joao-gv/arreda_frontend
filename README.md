# 🚗 Arreda - Frontend Web

> Interface moderna, responsiva e intuitiva para o sistema de caronas **Arreda**. Desenvolvida com Vue.js 3 para proporcionar a melhor experiência ao usuário.

---

## 📋 Sobre o Frontend
Esta camada é responsável por toda a interação com o usuário. Nela, motoristas podem cadastrar rotas e passageiros podem buscar viagens em tempo real. O foco é simplicidade e rapidez.

### 🛠️ Tecnologias Utilizadas
- **Framework:** [Vue.js 3](https://vuejs.org/) (Composition API)
- **Linguagem:** TypeScript
- **Ferramenta de Build:** Vite
- **Gerenciamento de Estado:** Pinia (substituto moderno do Vuex)
- **Navegação:** Vue Router
- **Estilização:** Tailwind CSS 
- **Consumo de API:** Axios

---

## 🏗️ Estrutura do Projeto
- **`src/views/`**: Páginas principais da aplicação (Home, Login, Perfil).
- **`src/components/`**: Componentes reutilizáveis (Inputs, Cards de Carona, Botões).
- **`src/services/`**: Configuração do Axios para chamadas ao backend Java.
- **`src/stores/`**: Gerenciamento de dados globais, como o token de autenticação.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- **Node.js** (v18 ou superior)
- **npm** (ou yarn)

### Passos para rodar
1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/SEU_USUARIO/arreda-frontend.git](https://github.com/SEU_USUARIO/arreda-frontend.git)
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
4.  **Acesse no navegador:**
    A aplicação estará em `http://localhost:5173`.

---

## 🔗 Conexão com o Backend
O frontend está configurado para se comunicar com a API Java rodando em `http://localhost:8080`. Certifique-se de que o Docker (PostgreSQL) e o Spring Boot estejam ativos.

---

## 👥 Equipe
- **Carlos Eduardo** - *Lider da equipe*
- **João Vieira** - *Responsável técnico*
- **João Vitor** -*Responsável pela apresentação*
- **Victor Fernandes** - *Responsável pela documentação* 
