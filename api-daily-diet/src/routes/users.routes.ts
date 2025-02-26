/**
 * Rotas do usuario:
 *  - POST /register
 *  - POST /login
 *  - GET /statistics
 * Uma rota para se cadastrar e uma rota para realizar o login e recuperar as informações daquela conta
 */

import { FastifyInstance } from "fastify";
import bcrypt from "bcrypt";
import { knex } from "../database";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { auth } from "../middlewares/auth";
import { env } from "../env";

export async function usersRoutes(app: FastifyInstance) {
  //Rota de criação de usuario
  app.post("/register", async (request, reply) => {
    console.log(request.body);
    const createUsersBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { name, email, password } = createUsersBodySchema.parse(request.body);

    if (!name || !email || !password) {
      return reply.status(400).send({ error: "Missing fields" });
    }

    const salt = 10;
    const hash = await bcrypt.hash(password, salt);

    try {
      const user = await knex.table("users").where({ email }).select().first();

      if (user) return reply.status(400).send({ error: "User already exists" });

      await knex.table("users").insert({
        id: crypto.randomUUID(),
        name,
        email,
        password: hash,
      });

      return reply.status(201).send();
    } catch (error) {
      console.log(error);
      return reply.status(500).send({ error: "Internal server error" });
    }
  });

  //Rota de login
  app.post("/login", async (request, reply) => {
    const createAuthBodySchema = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    const { email, password } = createAuthBodySchema.parse(request.body);

    if (!email || !password)
      return reply.status(400).send({ error: "Bad Request" });

    try {
      const user = await knex.table("users").where({ email }).select().first();

      if (!user) return reply.status(401).send({ error: "Unauthorized" });

      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid)
        return reply.status(401).send({ error: "Unauthorized" });

      const token = jwt.sign({ email: user.email }, env.JWT_SECRET, {
        expiresIn: "8h",
        subject: user.id,
      });

      return reply.status(200).send({
        data: { token },
      });
    } catch (error) {
      console.log(error);
      return reply.status(500).send({ error: "Internal server error" });
    }
  });

  //Rota para recuperar as metricas do usuario
  app.get(
    "/statistics",
    {
      preHandler: [auth],
    },
    async (request, reply) => {
      const user = request.user;

      const meals = knex.table("meals").where({ user_id: user?.id });

      const totalMeals = (await meals.count("*", { as: "totalMeals" })) ?? 0;
      const totalMealsInsideDiet =
        (await meals
          .where({ inside_diet: true })
          .count("*", { as: "totalMealsInsideDiet" })) ?? 0;

      const totalMealsOutsideDiet =
        Number(totalMeals[0]?.totalMeals) -
        Number(totalMealsInsideDiet[0]?.totalMealsInsideDiet);

      //Planejar a logica para contar a melhor sequencia de refeicoes dentro da dieta

      const bestSequence = 0;

      reply.status(200).send({
        data: {
          totalMeals: totalMeals[0]?.totalMeals,
          totalMealsInsideDiet: totalMealsInsideDiet[0]?.totalMealsInsideDiet,
          totalMealsOutsideDiet,
          bestSequence,
        },
      });
    }
  );
}
