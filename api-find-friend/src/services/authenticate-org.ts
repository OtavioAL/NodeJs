import { OrgsRepository } from "@/repositories/orgs.repository";
import { Org } from "@prisma/client";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

interface AuthenticateOrgUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateOrgUseCaseResponse {
  org: Org;
}

export class AuthenticateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateOrgUseCaseRequest): Promise<AuthenticateOrgUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email);

    if (!org) {
      throw new InvalidCredentialsError();
    }

    const isPasswordCorrect = await compare(password, org.password);

    if (!isPasswordCorrect) {
      throw new InvalidCredentialsError();
    }

    return {
      org,
    };
  }
}
