import { expect, describe, it, beforeEach } from "vitest";
import { CreatePetUseCase } from "./create-pets";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs.repository";

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: CreatePetUseCase;

describe("Create Pet Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);
    sut = new CreatePetUseCase(petsRepository, orgsRepository);
  });

  it("should to create gym", async () => {
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
      latitude: 0,
      longitude: 0,
      author_name: "author_name",
    });

    const { pet } = await sut.execute({
      name: "Pet 1",
      about: "about",
      age: "age",
      size: "size",
      energyLevel: "energyLevel",
      environment: "environment",
      orgId: org.id,
    });

    expect(pet.id).toEqual(expect.any(String));
  });
});
