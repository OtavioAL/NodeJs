import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs.repository";
import { hash } from "bcryptjs";
import { AuthenticateOrgUseCase } from "./authenticate-org";

let orgsRepository: InMemoryOrgsRepository;
let sut: AuthenticateOrgUseCase;

describe("Authenticate Org Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new AuthenticateOrgUseCase(orgsRepository);
  });

  it("should be able to authenticate with org", async () => {
    await orgsRepository.create({
      name: "Org 1",
      email: "email@com",
      password: await hash("123456", 6),
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

    const { org } = await sut.execute({
      email: "email@com",
      password: "123456",
    });

    expect(org.id).toEqual(expect.any(String));
  });
});
