import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { CreatePetUseCase } from "../create-pets";

export function makePetsUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const orgsRepository = new PrismaOrgsRepository();

  const useCase = new CreatePetUseCase(petsRepository, orgsRepository);

  return useCase;
}
