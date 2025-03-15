import { OrgsRepository } from "@/repositories/orgs.repository";
import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { OrgNotFoundError } from "./errors/org-not-found-error";

interface CreatePetUseCaseRequest {
  name: string;
  about: string;
  age: string;
  size: string;
  energyLevel: string;
  environment: string;
  orgId: string;
}

interface CreatePetUseCaseResponse {
  pet: Pet;
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository
  ) {}

  async execute({
    name,
    about,
    age,
    size,
    energyLevel,
    environment,
    orgId,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId);

    if (!org) {
      throw new OrgNotFoundError();
    }

    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size,
      energy_level: energyLevel,
      environment,
      org_id: orgId,
    });

    return {
      pet,
    };
  }
}
