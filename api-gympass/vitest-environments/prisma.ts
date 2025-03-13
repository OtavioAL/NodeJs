import "dotenv/config"; // Corrigindo a importação do dotenv
import { randomUUID } from "crypto";
import { execSync } from "child_process";
import { Environment } from "vitest";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

function generateDataBaseURL(schema: string) {
  const envDatabaseURL = process.env.DATABASE_URL;
  if (!envDatabaseURL) {
    throw new Error("Please provide a DATABASE_URL environment variable.");
  }

  const url = new URL(envDatabaseURL);

  // Adiciona o schema no URL da DATABASE_URL
  url.searchParams.set("schema", schema);

  return url.toString();
}

export default <Environment>{
  name: "prisma",
  transformMode: "ssr",
  async setup() {
    const schema = randomUUID();
    const databaseURL = generateDataBaseURL(schema);
    process.env.DATABASE_URL = databaseURL;

    try {
      await prisma.$executeRaw`CREATE SCHEMA IF NOT EXISTS "${schema}"`;
      await prisma.$executeRaw`SET search_path TO "${schema}"`;

      execSync("npx prisma migrate deploy");
    } catch (error) {
      console.error("Erro ao executar as migrations: ", error);
    }

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
