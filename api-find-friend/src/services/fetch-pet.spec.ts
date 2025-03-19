import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs.repository";
import { describe, it, beforeEach } from "vitest";
import { FetchNearbyPetsUseCase } from "./fetch-pet";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";

let orgsRepository: InMemoryOrgsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: FetchNearbyPetsUseCase;

describe("Fetch Nearby Pets Use Case", () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);
    sut = new FetchNearbyPetsUseCase(orgsRepository);
  });

  it("should be able to fetch nearby pets", async () => {
    const org = await orgsRepository.create({
      name: "Org 1",
      email: "email@com",
      password: "123456",
      whatsapp: "123456",
      cep: "123456",
      state: "state",
      city: "city",
      neighborhood: "neighborhood",
      street: "street",
      author_name: "author_name",
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    await orgsRepository.create({
      name: "Org 2",
      email: "email2@com",
      password: "123456",
      whatsapp: "123456",
      cep: "123456",
      state: "state",
      city: "city",
      neighborhood: "neighborhood",
      street: "street",
      author_name: "author_name",
      latitude: -27.0610928,
      longitude: -49.5229501,
    });

    await petsRepository.create({
      name: "Pet 1",
      about: "about",
      age: "age",
      size: "size",
      energy_level: "energyLevel",
      environment: "environment",
      org_id: org?.id,
    });

    const { orgs } = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    });

    console.log("orgs", orgs);

    // expect(gyms).toHaveLength(1);
    // expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });
});
