import "dotenv";
import { randomUUID } from "crypto";
import { execSync } from "child_process";
import { Environment } from "vitest";
import { prisma } from "@/lib/prisma";

function generateDataBaseURL(schema: string) {
  const envDatabaseURL = process.env.DATABASE_URL;
  if (!envDatabaseURL) {
    throw new Error("Please provide a DATABASE_URL environment variable.");
  }

  const url = new URL(envDatabaseURL);

  url.searchParams.set("schema", schema);

  return url.toString();
}

export default <Environment>{
  name: "prisma",
  transformMode: "ssr",
  setup(global, options) {
    console.log(global, options);

    console.log("passou aqui");

    const schema = randomUUID();

    const databaseURL = generateDataBaseURL(schema);

    console.log("dat", databaseURL);
    process.env.DATABASE_URL = databaseURL;

    // Deploy pq se fosse migrate dev o prisma iria verificar alterações pra gerar uma nova migration
    // Já no deploy ele vai rodar as migrations já existentes e criar as tabelas
    execSync("npx prisma migrate deploy");

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`
        );

        await prisma.$disconnect();
      },
    };
  },
};
