import { makeGetPetUseCase } from "@/services/factories/make-get-pet";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
  const getPetParamsSchema = z.object({
    id: z.string(),
  });

  const { id } = getPetParamsSchema.parse(request.params);

  const makeGetPet = makeGetPetUseCase();

  try {
    const { pet } = await makeGetPet.execute({ id });

    return reply.status(200).send({ pet });
  } catch (error) {
    console.log("error", error);

    return reply.status(500).send({ message: "Internal server error" });
  }
}
