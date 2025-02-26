import fastify from "fastify";
import cookie from "@fastify/cookie";
import { env } from "./env";
import { usersRoutes } from "./routes/users.routes";

export const app = fastify();

app.register(cookie);

app.register(require("@fastify/jwt"), {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: "1d", // Token válido por 1 dia
  },
});

app.register(usersRoutes, {
  prefix: "/users",
});
