import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { CreateOrgUseCase } from "../create-org";

export function makeOrgsUseCase() {
  const orgsRepository = new PrismaOrgsRepository();

  const useCase = new CreateOrgUseCase(orgsRepository);

  return useCase;
}
