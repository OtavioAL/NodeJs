import { FastifyReply, FastifyRequest } from "fastify";
import { env } from "../env";
import jwt from "jsonwebtoken";
import { verify } from "jsonwebtoken";

export async function auth(request: FastifyRequest, reply: FastifyReply) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return reply.status(403).send({ error: "Invalid token" });
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub: userId } = verify(token, env.JWT_SECRET);

    if (typeof userId !== "string") {
      return reply.status(403).send({ error: "Invalid token" });
    }

    request.user = {
      id: userId,
    };
  } catch {
    return reply.status(403).send({ error: "Invalid token" });
  }
}
