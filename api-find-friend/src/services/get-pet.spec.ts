import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs.repository";
import { GetPetUseCase } from "./get-pet";
import { PetNotFoundError } from "./errors/pet-not-found-error";

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: GetPetUseCase;

describe("Get Pet Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);
    sut = new GetPetUseCase(petsRepository);
  });

  it("should be able to get pet", async () => {
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

    const { id } = await petsRepository.create({
      name: "Pet 1",
      about: "about",
      age: "age",
      size: "size",
      energy_level: "energyLevel",
      environment: "environment",
      org_id: org.id,
    });

    const { pet } = await sut.execute({ id });

    expect(pet.name).toEqual("Pet 1");
  });

  it("should not be able to get pet with wrong id", async () => {
    await expect(() => sut.execute({ id: "wrong-id" })).rejects.toBeInstanceOf(
      PetNotFoundError
    );
  });
});
