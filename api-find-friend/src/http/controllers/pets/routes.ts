/*
  POST /pets - Cadatrar um pet (Obrigatorio informar id org)
  GET /pets  - Listar todos os pets (Deve ser obrigatorio informar a cidade)
  GET /pets/search - Listar pets por suas caracteristicas (ou transferir para a org)
   - /orgs/nearby
  GET /pet/:id - Visualizar detalhes de um pet para adoção
*/

import { FastifyInstance } from "fastify";
import { create } from "./create-pet";
import { search } from "./search-pets";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { getPet } from "./get-pet";

export async function petsRoutes(app: FastifyInstance) {
  app.post("/pets", { onRequest: [verifyJwt] }, create);

  app.get("/pets/search", search);

  app.get("/pet/:id", getPet);
}
