import { OrgsRepository } from "@/repositories/orgs.repository";
import { Org } from "@prisma/client";

interface FetchNearbyPetsUseCaseRequest {
  userLatitude: number;
  userLongitude: number;
}

interface FetchNearbyPetsUseCaseResponse {
  orgs: Org[];
}

export class FetchNearbyPetsUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyPetsUseCaseRequest): Promise<FetchNearbyPetsUseCaseResponse> {
    const orgs = await this.orgsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return {
      orgs,
    };
  }
}
