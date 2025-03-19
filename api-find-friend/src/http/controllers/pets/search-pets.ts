import { makeSearchPetsUseCase } from "@/services/factories/make-search-pets";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsQuerySchema = z.object({
    city: z.string(),
    age: z.string().optional(),
    size: z.string().optional(),
    energy_level: z.string().optional(),
    environment: z.string().optional(),
  });

  const { city, age, size, energy_level, environment } =
    searchPetsQuerySchema.parse(request.query);

  const makeSearchPet = makeSearchPetsUseCase();

  try {
    const { pets } = await makeSearchPet.execute({
      city,
      age,
      size,
      energy_level,
      environment,
    });

    return reply.status(200).send({ pets });
  } catch (error) {
    console.log(error);

    return reply.status(500).send({ message: "Internal server error" });
  }
}
