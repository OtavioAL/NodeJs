import { makeAuthenticateOrgsUseCase } from "@/services/factories/make-authenticate-orgs";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateOrgBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateOrgBodySchema.parse(request.body);

  try {
    const authenticateOrgUseCase = makeAuthenticateOrgsUseCase();

    const { org } = await authenticateOrgUseCase.execute({
      email,
      password,
    });

    const token = await reply.jwtSign({
      sign: {
        sub: org.id,
      },
    });

    const refreshToken = await reply.jwtSign({
      sign: {
        sub: org.id,
        expiresIn: "7d",
      },
    });

    return reply
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
      });
  } catch (error) {
    console.log(error);

    return reply.status(500).send({ message: "Internal server error" });
  }
}
