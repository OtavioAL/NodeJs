import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs.repository";
import { CreateOrgUseCase } from "./create-org";

let orgsRepository: InMemoryOrgsRepository;
let sut: CreateOrgUseCase;

describe("Create Org Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new CreateOrgUseCase(orgsRepository);
  });

  it("should to create org", async () => {
    const { org } = await sut.execute({
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

    expect(org.id).toEqual(expect.any(String));
    expect(org.name).toEqual("Org 1");
  });
});
