# API - Find a Friend

## Descrição

A **Find a Friend** é uma API desenvolvida para conectar organizações de adoção de animais com pessoas interessadas em adotar um pet. A aplicação permite que organizações cadastrem animais disponíveis para adoção e que usuários possam buscar pets em suas cidades, aplicando filtros de características específicas.

## Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **Fastify** - Framework web para alta performance
- **Prisma** - ORM para interação com banco de dados PostgreSQL
- **Docker** - Containerização para padronização do ambiente
- **JWT (JSON Web Token)** - Autenticação segura
- **Refresh Token** - Gerenciamento de sessão
- **SOLID** - Princípios para um código limpo e modular
- **Design Patterns** - Factory Pattern e Repository Pattern
- **Vitest** - Testes unitários e de integração

## Funcionalidades

### Para Organizações:

- Cadastro e autenticação de organizações
- Cadastro de pets disponíveis para adoção

### Para Usuários:

- Busca de pets por cidade
- Filtragem de pets por características (idade, tamanho, energia, ambiente)
- Visualização dos detalhes do pet
- Contato direto com a organização via WhatsApp

## Regras de Negócio

- Para listar os pets, é obrigatório informar a cidade
- Uma ORG precisa ter um endereço e um número de WhatsApp
- Cada pet está associado a uma ORG
- A adoção é intermediada via WhatsApp
- ORGs devem estar autenticadas para cadastrar novos pets

## Rotas da API

### Autenticação e Organizações

- `POST /orgs` - Criar uma nova organização
- `POST /orgs/authenticate` - Autenticar uma organização
- `PATCH /token/refresh` - Renovar o token de autenticação

### Pets

- `POST /pets` - Cadastrar um novo pet (Requer autenticação)
- `GET /pets/search` - Buscar pets por cidade e filtros opcionais
- `GET /pet/:id` - Obter detalhes de um pet

## Possíveis Erros

- `Invalid credentials.` - Credenciais inválidas
- `E-mail already exists.` - O e-mail já está em uso
- `Organization not found.` - Organização não encontrada
- `Pet not found.` - Pet não encontrado

## Como Rodar o Projeto

1. Clone o repositório:
   ```sh
   git clone https://github.com/OtavioAL/api-find-friend.git
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Configure as variáveis de ambiente no arquivo `.env`
4. Suba o container do PostgreSQL com Docker:
   ```sh
   docker-compose up -d
   ```
5. Execute as migrações do banco de dados:
   ```sh
   npx prisma migrate dev
   ```
6. Inicie o servidor:
   ```sh
   npm run start:dev
   ```

## Testes

Rodar testes unitários:

```sh
npm run test
```

Rodar testes E2E:

```sh
npm run test:e2e
```
