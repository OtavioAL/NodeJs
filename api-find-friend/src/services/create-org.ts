import { OrgsRepository } from "@/repositories/orgs.repository";
import { Org } from "@prisma/client";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";
import { hash } from "bcryptjs";

interface CreateOrgUseCaseRequest {
  name: string;
  author_name: string;
  email: string;
  whatsapp: string;
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  latitude: number;
  longitude: number;
  password: string;
}

interface CreateOrgUseCaseResponse {
  org: Org;
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    author_name,
    email,
    whatsapp,
    cep,
    state,
    city,
    neighborhood,
    street,
    latitude,
    longitude,
    password,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const orgAlreadyExists = await this.orgsRepository.findByEmail(email);

    if (orgAlreadyExists) {
      throw new OrgAlreadyExistsError();
    }

    const passwordHash = await hash(password, 6);

    const org = await this.orgsRepository.create({
      name,
      author_name,
      email,
      whatsapp,
      cep,
      state,
      city,
      neighborhood,
      street,
      latitude,
      longitude,
      password: passwordHash,
    });

    return {
      org,
    };
  }
}
