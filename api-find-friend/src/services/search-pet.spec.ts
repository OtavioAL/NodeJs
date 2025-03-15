import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs.repository";
import { SearchUseCase } from "./search-pet";

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: SearchUseCase;

describe("Fetch Pet Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);
    sut = new SearchUseCase(petsRepository);
  });

  it("should be able to search pets by city", async () => {
    const org = await orgsRepository.create({
      name: "Org 1",
      email: "email@com",
      password: "123456",
      whatsapp: "123456",
      cep: "123456",
      state: "state",
      city: "Belo Horizonte",
      neighborhood: "neighborhood",
      street: "street",
      latitude: 0,
      longitude: 0,
      author_name: "author_name",
    });

    await petsRepository.create({
      name: "Pet 1",
      about: "about",
      age: "age",
      size: "size",
      energy_level: "energyLevel",
      environment: "environment",
      org_id: org.id,
    });

    await petsRepository.create({
      name: "Pet 2",
      about: "about",
      age: "age",
      size: "size",
      energy_level: "energyLevel",
      environment: "environment",
      org_id: org.id,
    });

    const { pets } = await sut.execute({ city: org?.city });

    expect(pets).toHaveLength(2);
  });
  it("should be able to search pets by city and age", async () => {
    const org = await orgsRepository.create({
      name: "Org 1",
      email: "email@com",
      password: "123456",
      whatsapp: "123456",
      cep: "123456",
      state: "state",
      city: "Belo Horizonte",
      neighborhood: "neighborhood",
      street: "street",
      latitude: 0,
      longitude: 0,
      author_name: "author_name",
    });

    await petsRepository.create({
      name: "Pet 1",
      about: "about",
      age: "1",
      size: "size",
      energy_level: "energyLevel",
      environment: "environment",
      org_id: org.id,
    });

    await petsRepository.create({
      name: "Pet 2",
      about: "about",
      age: "2",
      size: "size",
      energy_level: "energyLevel",
      environment: "environment",
      org_id: org.id,
    });

    const { pets } = await sut.execute({ city: org?.city, age: "1" });

    expect(pets).toHaveLength(1);
  });
});
