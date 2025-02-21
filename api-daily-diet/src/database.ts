import { knex as setupKnex, Knex } from "knex";
import { env } from "./env";

export const config: Knex.Config = {
  client: env.DATA_CLIENT_DB,
  connection:
    env.DATA_CLIENT_DB === "pg"
      ? env.DATABASE_URL
      : {
          filename: env.DATABASE_URL!,
        },
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./db/migrations",
  },
};

export const knex = setupKnex(config);
