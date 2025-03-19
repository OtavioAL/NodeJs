import { makeOrgsUseCase } from "@/services/factories/make-create-orgs";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrgBodySchema = z.object({
    name: z.string(),
    authorName: z.string(),
    email: z.string().email(),
    whatsapp: z.string(),
    cep: z.string(),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    password: z.string().min(6),
  });

  try {
    const {
      name,
      authorName,
      email,
      whatsapp,
      cep,
      state,
      city,
      neighborhood,
      street,
      latitude,
      longitude,
      password,
    } = createOrgBodySchema.parse(request.body);
    const makeCreateOrgUseCase = makeOrgsUseCase();

    const org = await makeCreateOrgUseCase.execute({
      name,
      author_name: authorName,
      email,
      whatsapp,
      cep,
      state,
      city,
      neighborhood,
      street,
      latitude,
      longitude,
      password,
    });

    return reply.status(201).send(org);
  } catch (error) {
    console.log(error);

    return reply.status(500).send({ message: "Internal server error" });
  }
}
