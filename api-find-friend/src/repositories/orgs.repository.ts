import { Org, Pet, Prisma } from "@prisma/client";

export interface FindManyNearbyParams {
  latitude: number;
  longitude: number;
}

export interface OrgsRepository {
  findById(id: string): Promise<Org | null>;
  findByEmail(email: string): Promise<Org | null>;
  findManyNearby(params: FindManyNearbyParams): Promise<Org[]>;
  findMany(city: string): Promise<Pet[]>;
  create(data: Prisma.OrgCreateInput): Promise<Org>;
}
