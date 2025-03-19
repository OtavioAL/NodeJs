import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { SearchUseCase } from "../search-pet";

export function makeSearchPetsUseCase() {
  const petsRepository = new PrismaPetsRepository();

  const useCase = new SearchUseCase(petsRepository);

  return useCase;
}
