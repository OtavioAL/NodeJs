/**
 * 
*    ### Regras da aplicação

    - Deve ser possível cadastrar um pet
    - Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
    - Deve ser possível filtrar pets por suas características
    - Deve ser possível visualizar detalhes de um pet para adoção
    - Deve ser possível se cadastrar como uma ORG
    - Deve ser possível realizar login como uma ORG

    ### Regras de negócio

    - Para listar os pets, obrigatoriamente precisamos informar a cidade
    - Uma ORG precisa ter um endereço e um número de WhatsApp
    - Um pet deve estar ligado a uma ORG
    - O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
    - Todos os filtros, além da cidade, são opcionais
    - Para uma ORG acessar a aplicação como admin, ela precisa estar logada
 * 
 */

import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { petsRoutes } from "./http/controllers/pets/routes";
import { orgsRoutes } from "./http/controllers/orgs/routes";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

app.register(fastifyCookie);

app.register(petsRoutes);
app.register(orgsRoutes);

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: Here we should log to a external tool like DataDog/Sentry
  }

  return reply.status(500).send({ message: "Internal server error" });
});
