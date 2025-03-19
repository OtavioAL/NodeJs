import { makePetsUseCase } from "@/services/factories/make-create-pets";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.string(),
    size: z.string(),
    energyLevel: z.string(),
    environment: z.string(),
  });

  const { name, about, age, size, energyLevel, environment } =
    createPetBodySchema.parse(request.body);

  const makeCreatePetUseCase = makePetsUseCase();

  const orgId = request.user.sub ?? request?.user?.sign?.sub;

  try {
    const pet = await makeCreatePetUseCase.execute({
      name,
      about,
      age,
      size,
      energyLevel,
      environment,
      orgId,
    });

    return reply.status(201).send(pet);
  } catch (error) {
    console.error(error);

    return reply.status(500).send({ message: "Internal server error" });
  }
}
