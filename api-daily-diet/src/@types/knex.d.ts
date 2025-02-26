import "knex";

declare module "knex/types/tables" {
  export interface Tables {
    users: {
      id: string;
      name: string;
      email: string;
      password: string;
      created_at: string;
      updated_at: string;
    };

    meals: {
      id: string;
      user_id: string;
      name: string;
      description: string;
      inside_diet: boolean;
      date: number; // unix timestamp
      created_at: string;
      updated_at: string;
    };
  }
}
