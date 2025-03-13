import { Prisma, User } from "@prisma/client";
import { usersRepository } from "../users-repository";

export class InMemoryUsersRepository implements usersRepository {
  public items: User[] = [];

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.items.find((item) => item.email === email) || null;
  }
  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.items.push(user);

    return user;
  }
}
