# API de Check-ins em Academias

## Descrição

Esta API foi desenvolvida para permitir o gerenciamento de check-ins em academias, oferecendo recursos como autenticação de usuários, cadastro e busca de academias, validação de check-ins, e controle de acessos baseado em funções de usuários. O projeto segue princípios do SOLID, Design Patterns e boas práticas de arquitetura.

## Tecnologias Utilizadas

- **Node.js**
- **Fastify**
- **Prisma ORM**
- **PostgreSQL**
- **Docker**
- **JWT (JSON Web Token) e Refresh Token**
- **RBAC (Role-Based Access Control)**
- **Factory Pattern**
- **Arquitetura Limpa (Clean Architecture)**
- **Testes (Unitários e End-to-End) com Vitest**
- **CI/CD**

---

## Instalação e Configuração

### Requisitos:

- Node.js 18+
- Docker
- PostgreSQL

### Passos para execução:

```bash
# Clone o repositório
git clone https://github.com/seuusuario/api-checkins-academia.git
cd api-checkins-academia

# Instale as dependências
npm install

# Copie o arquivo .env.example e configure as variáveis de ambiente
cp .env.example .env

# Suba os containers com PostgreSQL e Prisma Migrate
docker-compose up -d

# Execute as migrações do Prisma
npx prisma migrate dev

# Inicie o servidor
npm run start:dev
```

---

## Regras de Negócio

- O usuário **não pode** se cadastrar com um e-mail já existente.
- O usuário **não pode** fazer dois check-ins no mesmo dia.
- O usuário **não pode** fazer check-in se estiver a mais de 100m da academia.
- Check-ins **só podem ser validados** dentro de 20 minutos após a criação.
- Apenas **administradores** podem cadastrar academias e validar check-ins.

---

## Endpoints da API

### **Autenticação e Usuários**

| Método | Endpoint         | Descrição                       |
| ------ | ---------------- | ------------------------------- |
| POST   | `/users`         | Cadastro de usuário             |
| POST   | `/sessions`      | Login e geração de JWT          |
| PATCH  | `/token/refresh` | Refresh Token                   |
| GET    | `/me`            | Perfil do usuário (autenticado) |

### **Academias**

| Método | Endpoint       | Descrição                    |
| ------ | -------------- | ---------------------------- |
| GET    | `/gyms/search` | Busca de academias pelo nome |
| GET    | `/gyms/nearby` | Busca de academias próximas  |
| POST   | `/gyms`        | Cadastro de academia (admin) |

### **Check-ins**

| Método | Endpoint                         | Descrição                     |
| ------ | -------------------------------- | ----------------------------- |
| GET    | `/check-ins/history`             | Histórico de check-ins        |
| GET    | `/check-ins/metrics`             | Métricas de check-ins         |
| POST   | `/gyms/:gymId/check-ins`         | Realiza um check-in           |
| PATCH  | `/check-ins/:checkInId/validate` | Validação de check-in (admin) |

---

## Tratamento de Erros

| Código | Mensagem                                                               |
| ------ | ---------------------------------------------------------------------- |
| 401    | `Invalid credentials.`                                                 |
| 403    | `The check-in can only be validated until 20 minutes of its creation.` |
| 403    | `Max distance reached.`                                                |
| 403    | `Max number of check-ins reached.`                                     |
| 404    | `Resource not found.`                                                  |
| 409    | `User already exists.`                                                 |

---

## Estrutura do Projeto

```
/api-checkins-academia
├── prisma/          # Schemas e migrações do Prisma
├── src/
│   ├── http/       # Controladores das rotas
│   ├── repositories/ # Implementação dos Repositórios
│   ├── use-cases/  # Casos de uso da aplicação
│   ├── server.ts   # Configuração do servidor
│   └── app.ts      # Configuração do Fastify
├── .env.example    # Variáveis de ambiente
├── package.json    # Dependências e scripts
└── README.md       # Documentação
```

---

## Testes e CI/CD

### Rodando os Testes

```bash
# Testes unitários
npm run test

# Testes End-to-End
npm run test:e2e

# Testes de cobertura
npm run test:coverage
```

### Integração Contínua (CI)

A API utiliza pipelines de CI/CD para execução automática de testes e deploy.

---

## Contribuição

1. Fork este repositório.
2. Crie uma branch: `git checkout -b feature/nova-feature`.
3. Commit suas mudanças: `git commit -m 'Adiciona nova funcionalidade'`.
4. Push para sua branch: `git push origin feature/nova-feature`.
5. Abra um Pull Request.

---
