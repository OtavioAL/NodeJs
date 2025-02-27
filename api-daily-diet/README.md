# 📌 Daily Diet API

API desenvolvida em Node.js utilizando Fastify para gerenciamento e monitoramento de dietas dos usuários. Permite o registro, edição e exclusão de refeições, além de métricas detalhadas sobre os hábitos alimentares.

---

## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

- **Node.js**
- **Fastify**
- **Knex.js** (SQLite3 como banco de dados)
- **Zod** (validação de dados)
- **JWT** (autenticação)
- **Bcrypt** (hash de senhas)
- **Vitest** (testes de integração)

---

## 📌 Funcionalidades

- Cadastro e autenticação de usuários
- Identificação do usuário nas requisições
- Registro de refeições com nome, descrição, data/hora e status (dentro ou fora da dieta)
- Edição e exclusão de refeições
- Visualização detalhada de uma refeição
- Estatísticas do usuário:
  - Total de refeições
  - Total de refeições dentro e fora da dieta
  - Melhor sequência de refeições dentro da dieta
- Restrições de acesso: um usuário só pode visualizar, editar e excluir suas próprias refeições

---

## 📌 Rotas da API

### 🔐 Autenticação

#### 📌 Criar usuário

`POST /users/register`

**Request:**

```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123"
}
```

**Responses:**

- `201 Created` - Usuário criado com sucesso
- `400 Bad Request` - Usuário já existe
- `500 Internal Server Error`

#### 📌 Login do usuário

`POST /users/login`

**Request:**

```json
{
  "email": "joao@email.com",
  "password": "senha123"
}
```

**Responses:**

- `200 OK` - Retorna token de autenticação
- `401 Unauthorized` - Credenciais inválidas
- `500 Internal Server Error`

---

### 🍽️ Refeições

#### 📌 Criar refeição

`POST /meals`

**Headers:** `Authorization: Bearer <token>`

**Request:**

```json
{
  "name": "Salada de Frango",
  "description": "Salada com peito de frango grelhado",
  "date": "2025-02-13T12:00:00.000Z",
  "insideDiet": true
}
```

**Responses:**

- `201 Created` - Refeição registrada
- `400 Bad Request`
- `500 Internal Server Error`

#### 📌 Editar refeição

`PUT /meals/:id`

**Request:** (Envia apenas os campos que deseja modificar)

```json
{
  "name": "Salada de Atum"
}
```

**Responses:**

- `201 Created` - Refeição editada com sucesso
- `404 Not Found` - Refeição não encontrada
- `500 Internal Server Error`

#### 📌 Excluir refeição

`DELETE /meals/:id`

**Responses:**

- `204 No Content` - Refeição excluída
- `404 Not Found` - Refeição não encontrada
- `500 Internal Server Error`

#### 📌 Obter uma refeição específica

`GET /meals/:id`

**Responses:**

- `200 OK` - Retorna detalhes da refeição
- `404 Not Found` - Refeição não encontrada
- `500 Internal Server Error`

#### 📌 Listar todas as refeições

`GET /meals`

**Responses:**

- `200 OK` - Lista todas as refeições do usuário
- `500 Internal Server Error`

#### 📌 Atualizar status da refeição

`PATCH /meals/:id/insideDiet`

**Responses:**

- `201 Created` - Status atualizado
- `404 Not Found` - Refeição não encontrada
- `500 Internal Server Error`

---

### 📊 Estatísticas do usuário

#### 📌 Obter métricas

`GET /users/statistics`

**Responses:**

```json
{
  "totalMeals": 10,
  "totalMealsInsideDiet": 6,
  "totalMealsOutsideDiet": 4,
  "bestSequence": 3
}
```

- `200 OK` - Retorna métricas
- `500 Internal Server Error`

---

## ⚙️ Configuração do Projeto

### 📌 Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- [SQLite](https://www.sqlite.org/) instalado

### 📌 Instalando dependências

```sh
npm install
```

### 📌 Executando a aplicação

```sh
npm run dev
```

### 📌 Rodando testes

```sh
npm test
```

---

## 📝 Licença

Este projeto está sob a licença MIT. Sinta-se livre para utilizá-lo e melhorá-lo! 😊
