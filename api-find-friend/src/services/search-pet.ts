import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface SearchUseCaseRequest {
  city: string;
  age?: string;
  size?: string;
  energy_level?: string;
  environment?: string;
}

interface SearchUseCaseResponse {
  pets: Pet[];
}

export class SearchUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    energy_level,
    environment,
    size,
  }: SearchUseCaseRequest): Promise<SearchUseCaseResponse> {
    const pets = await this.petsRepository.findAll({
      city,
      age,
      energy_level,
      environment,
      size,
    });

    return {
      pets,
    };
  }
}
