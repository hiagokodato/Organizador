# Meu Gestor Financeiro 💸

![License](https://img.shields.io/badge/license-MIT-blue.svg)

Aplicação web full-stack desenvolvida para auxiliar no controle de finanças pessoais. Permite que os usuários se cadastrem, façam login e gerenciem suas receitas e despesas de forma simples e intuitiva, com dados persistidos em um banco de dados e autenticação segura.

## 📸 Visualização

(Adicione aqui um screenshot da sua aplicação rodando! Isso torna o README muito mais atrativo. Você pode arrastar e soltar a imagem na interface do GitHub quando for editar o README.)

![Demonstração do App](URL_DA_SUA_IMAGEM_OU_GIF_AQUI)

## ✨ Funcionalidades

* **Autenticação de Usuários:** Cadastro e Login seguros utilizando JSON Web Tokens (JWT).
* **Dashboard Interativo:** Resumo financeiro com o total de receitas, despesas e o saldo atual.
* **Gerenciamento de Transações (CRUD):**
    * Adição de novas transações (receitas ou despesas).
    * Listagem do histórico completo de transações.
    * Exclusão de transações.
* **Segurança:** Rotas do backend protegidas para garantir que apenas usuários autenticados possam acessar e manipular seus próprios dados.

## 💻 Tecnologias Utilizadas

A aplicação é dividida em duas partes principais: o frontend (client) e o backend (server).

#### **Frontend (Client)**
* **React.js:** Biblioteca para construção da interface de usuário.
* **Tailwind CSS:** Framework CSS para estilização rápida e moderna.
* **Axios:** Cliente HTTP para realizar requisições à API do backend.
* **React Router Dom:** Para gerenciamento das rotas da aplicação.

#### **Backend (Server)**
* **Node.js:** Ambiente de execução para o JavaScript no lado do servidor.
* **Express.js:** Framework para criação da API RESTful.
* **MongoDB:** Banco de dados NoSQL para armazenamento dos dados.
* **Mongoose:** ODM para modelar os dados da aplicação e interagir com o MongoDB.
* **JSON Web Token (JWT):** Para implementação do sistema de autenticação.
* **Bcrypt.js:** Para hashing de senhas antes de salvá-las no banco de dados.
* **Dotenv:** Para gerenciamento de variáveis de ambiente.

## 🛠️ Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
* [Node.js](https://nodejs.org/en/) (v18 ou superior recomendado)
* [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
* [Git](https://git-scm.com/)
* Uma instância do **MongoDB** rodando (localmente ou na nuvem através do [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)).

## 🚀 Como Rodar o Projeto

Siga os passos abaixo para executar a aplicação localmente:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/SEU_USUARIO/meu-gestor-financeiro.git](https://github.com/SEU_USUARIO/meu-gestor-financeiro.git)
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd meu-gestor-financeiro
    ```

3.  **Instale as dependências do Backend:**
    ```bash
    cd server
    npm install
    ```

4.  **Instale as dependências do Frontend:**
    * Abra um **novo terminal** ou volte para a pasta raiz (`cd ..`).
    ```bash
    cd client
    npm install
    ```

5.  **Configure as Variáveis de Ambiente:**
    * Na pasta `server`, crie um arquivo chamado `.env`.
    * Copie o conteúdo do arquivo `.env.example` (se houver) ou use o modelo abaixo e cole no seu `.env`:
        ```
        MONGO_URI=SUA_STRING_DE_CONEXAO_DO_MONGODB
        JWT_SECRET=SEU_SEGREDO_ALEATORIO_PARA_JWT
        PORT=5000
        ```
    * **Importante:** Substitua os valores pelas suas próprias credenciais.

6.  **Rode a Aplicação:**
    * **Para o Backend (no terminal da pasta `server`):**
        ```bash
        npm run dev
        ```
    * **Para o Frontend (no terminal da pasta `client`):**
        ```bash
        npm start
        ```
    * Acesse `http://localhost:3000` no seu navegador.

## 🔌 Endpoints da API

| Método | Rota                     | Descrição                      | Protegida? |
| :----- | :----------------------- | :----------------------------- | :--------: |
| `POST` | `/api/users/register`    | Registra um novo usuário.      |     Não      |
| `POST` | `/api/users/login`       | Autentica um usuário e retorna um token. |     Não      |
| `GET`  | `/api/transactions`      | Lista todas as transações do usuário logado. |    **Sim** |
| `POST` | `/api/transactions`      | Adiciona uma nova transação.   |    **Sim** |
| `PUT`  | `/api/transactions/:id`  | Atualiza uma transação existente. (Não implementado no front) |    **Sim** |
| `DELETE`| `/api/transactions/:id`| Deleta uma transação.          |    **Sim** |


## 📄 Licença

Este projeto está sob a licença MIT.