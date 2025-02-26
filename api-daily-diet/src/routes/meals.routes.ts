/**
 * POST /meals
 *  - nome
 *  - descricao
 *  - data e hora
 *  - dentro ou fora da refeição (campo boolean)
 * PUT /meals/:id
 *  - é possivel editar todos os campos
 * PATCH /meals/:id/insideDiet
 *  - alterar somente o campo de dentro ou fora da dieta
 * DELETE /meals/:id
 * GET /meals/:id
 *
 */

import { FastifyInstance } from "fastify";

export async function mealsRoutes(app: FastifyInstance) {
  app.post("/", async (request, reply) => {
    return reply.status(201).send();
  });
  app.put("/:id", async (request, reply) => {
    return reply.status(201).send();
  });
  app.patch("/:id/insideDiet", async (request, reply) => {
    return reply.status(201).send();
  });
  app.delete("/:id", async (request, reply) => {
    return reply.status(201).send();
  });
}
