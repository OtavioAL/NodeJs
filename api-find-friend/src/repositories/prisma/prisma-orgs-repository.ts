import { Org, Pet, Prisma } from "@prisma/client";
import { FindManyNearbyParams, OrgsRepository } from "../orgs.repository";
import { prisma } from "@/lib/prisma";

export class PrismaOrgsRepository implements OrgsRepository {
  async findMany(city: string): Promise<Pet[]> {
    const orgs = await prisma.org.findMany({
      where: {
        city,
      },
      include: {
        pets: true,
      },
    });

    const petsAvailable = orgs.flatMap((org) => org.pets);

    return petsAvailable;
  }
  async findById(id: string) {
    const org = await prisma.org.findUnique({
      where: {
        id,
      },
    });

    return org;
  }
  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    });

    return org;
  }
  async findManyNearby({
    latitude,
    longitude,
  }: FindManyNearbyParams): Promise<Org[]> {
    const orgs = await prisma.$queryRaw<Org[]>`
    SELECT * from orgs
    WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
  `;

    return orgs;
  }
  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    });

    return org;
  }
}
