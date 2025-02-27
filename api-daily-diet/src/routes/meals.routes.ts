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
import { z } from "zod";
import { knex } from "../database";
import { auth } from "../middlewares/auth";

export async function mealsRoutes(app: FastifyInstance) {
  //Criação da refeição
  app.post(
    "/",
    {
      preHandler: [auth],
    },
    async (request, reply) => {
      const createMealsBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        date: z.string(),
        insideDiet: z.boolean(),
      });

      try {
        const { name, description, date, insideDiet } =
          createMealsBodySchema.parse(request.body);

        const dateMeals = new Date(date);

        const user = request.user;

        await knex.table("meals").insert({
          id: crypto.randomUUID(),
          name,
          description,
          date: dateMeals.getTime(),
          inside_diet: insideDiet,
          user_id: user?.id,
        });

        return reply.status(201).send();
      } catch (error) {
        console.log(error);
        return reply.status(500).send({ error: "Internal Server Error" });
      }
    }
  );
  //Alterar as informações da refeição
  app.put(
    "/:id",
    {
      preHandler: [auth],
    },
    async (request, reply) => {
      const createMealsBodySchema = z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        date: z.string().optional(),
        insideDiet: z.boolean().optional(),
      });

      const { name, description, date, insideDiet } =
        createMealsBodySchema.parse(request.body);

      const { id } = request.params as { id: string };

      const meal = await knex.table("meals").where({ id }).select().first();

      if (!meal) return reply.status(404).send({ error: "Meal not found" });

      const body: {
        name?: string;
        description?: string;
        date?: number;
        inside_diet?: boolean;
        updated_at: string;
      } = {
        name: name ?? meal.name,
        description: description ?? meal.description,
        inside_diet: insideDiet ?? meal.inside_diet,
        updated_at: new Date().toISOString(),
      };

      if (date) {
        const dateMeals = new Date(date);
        body.date = dateMeals.getTime();
      }

      try {
        await knex.table("meals").where({ id }).update(body);
        return reply.status(201).send();
      } catch (error) {
        console.log(error);
        return reply.status(400).send({ error: "Bad Request" });
      }
    }
  );
  // Atualizar o status de dentro ou fora da dieta
  app.patch(
    "/:id/insideDiet",
    {
      preHandler: [auth],
    },
    async (request, reply) => {
      const { id } = request.params as { id: string };

      try {
        if (!id) return reply.status(400).send({ error: "Bad Request" });

        const meal = await knex.table("meals").where({ id }).select().first();

        if (!meal) return reply.status(404).send({ error: "Meal not found" });

        await knex
          .table("meals")
          .where({ id })
          .update({ inside_diet: !meal.inside_diet });

        return reply.status(201).send();
      } catch (error) {
        console.log(error);
        return reply.status(500).send({ error: "Internal Server Error" });
      }
    }
  );
  //Deletar uma refeição
  app.delete(
    "/:id",
    {
      preHandler: [auth],
    },
    async (request, reply) => {
      try {
        const { id } = request.params as { id: string };

        if (!id) return reply.status(400).send({ error: "Bad Request" });

        const meal = await knex.table("meals").where({ id }).select().first();

        if (!meal) return reply.status(404).send({ error: "Meal not found" });

        await knex.table("meals").where({ id }).delete();

        return reply.status(201).send();
      } catch (error) {
        console.log(error);
        return reply.status(500).send({ error: "Internal Server Error" });
      }
    }
  );
  //Obter informações de uma refeição em especifico
  app.get(
    "/:id",
    {
      preHandler: [auth],
    },
    async (request, reply) => {
      try {
        const { id } = request.params as { id: string };

        if (!id) return reply.status(400).send({ error: "Bad Request" });

        const meal = await knex.table("meals").where({ id }).select().first();

        if (!meal) return reply.status(404).send({ error: "Meal not found" });

        const { inside_diet, ...rest } = meal;

        return reply.status(200).send({
          data: {
            ...rest,
            insideDiet: inside_diet ? true : false,
          },
        });
      } catch (error) {
        console.log(error);
        return reply.status(500).send({ error: "Internal Server Error" });
      }
    }
  );
  //Obter a lista das refeições
  app.get(
    "/",
    {
      preHandler: [auth],
    },
    async (_request, reply) => {
      try {
        const meals = await knex.table("meals").select("*");

        const mealsFormated = meals.map((meal) => {
          const { inside_diet, ...rest } = meal;
          return {
            ...rest,
            insideDiet: inside_diet ? true : false,
          };
        });

        return reply.status(200).send({
          data: {
            meals: mealsFormated,
          },
        });
      } catch (error) {
        console.log(error);
        return reply.status(500).send({ error: "Internal Server Error" });
      }
    }
  );
}
