import { expect, describe, it, beforeEach } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { UsersAlreadyExistsError } from "./errors/users-already-exists-error";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it("should be able to register", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "a@b.com",
      password: "123456",
    });

    expect(user?.id).toEqual(expect.any(String));
  });
  it("should hash user password upon registration", async () => {
    // const prismaUsersRepository = new PrismaUsersRepository();

    // const registerUseCase = new RegisterUseCase(prismaUsersRepository);

    // const registerUseCase = new RegisterUseCase({
    //   async create(data) {
    //     return {
    //       id: "1",
    //       name: data.name,
    //       email: data.email,
    //       password_hash: data.password_hash,
    //       created_at: new Date(),
    //     };
    //   },
    //   async findByEmail() {
    //     return null;
    //   },
    // });

    const { user } = await sut.execute({
      name: "John Doe",
      email: "a@b.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);

    // const user = await prismaUsersRepository.findByEmail('a@b.com');

    // expect(user?.password_hash).toEqual(expect.any(String));
  });
  it("should not be able to register with same email twice", async () => {
    const email = "a@b.com";

    await sut.execute({
      name: "John Doe",
      email,
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        name: "John Doe",
        email,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UsersAlreadyExistsError);
  });
});
