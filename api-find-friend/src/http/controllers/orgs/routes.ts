/*
  POST /orgs - Cadatrar uma ORG (Endereço e telefone)
  POST /orgs/authenticate - Login de uma ORG
  GET /orgs/nearby - Listar todos os pets disponiveis para adoção em uma cidade
*/

import { FastifyInstance } from "fastify";
import { create } from "./create-orgs";
import { authenticate } from "./authenticate-orgs";
import { refresh } from "./refresh-token";

export async function orgsRoutes(app: FastifyInstance) {
  app.post("/orgs", create);

  app.post("/orgs/authenticate", authenticate);

  app.patch("/token/refresh", refresh);
}
