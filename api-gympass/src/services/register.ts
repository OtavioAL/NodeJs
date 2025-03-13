import { usersRepository } from "../repositories/users-repository";
import { hash } from "bcryptjs";
import { UsersAlreadyExistsError } from "./errors/users-already-exists-error";
import { User } from "@prisma/client";

type RegisterUseCaseRequest = {
  name: string;
  email: string;
  password: string;
};

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private usersRepository: usersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UsersAlreadyExistsError();
    }

    const password_hash = await hash(password, 6);

    // const prismaUsersRepository = new PrismaUsersRepository();

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return {
      user,
    };
  }
}
