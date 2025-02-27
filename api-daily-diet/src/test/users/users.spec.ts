import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "../../app";
import { execSync } from "node:child_process";
import request from "supertest";

describe("Users routes", () => {
  beforeAll(async () => {
    await app.ready();
  }, 30000);

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    execSync("npx knex migrate:rollback --all");
    execSync("npx knex migrate:latest");
  });

  it("should be able to create a new user", async () => {
    await request(app.server)
      .post("/users/register")
      .send({
        name: "John Doe",
        email: "john.doe@example.com",
        password: "123456",
      })
      .expect(201);
  });

  it("should be able to login", async () => {
    await request(app.server).post("/users/register").send({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "123456",
    });

    await request(app.server)
      .post("/users/login")
      .send({
        email: "john.doe@example.com",
        password: "123456",
      })
      .expect(200);
  });

  it("should be able to get user metrics", async () => {
    await request(app.server).post("/users/register").send({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "123456",
    });

    const data = await request(app.server).post("/users/login").send({
      email: "john.doe@example.com",
      password: "123456",
    });

    const token = data?.body.data.token;

    const response = await request(app.server)
      .get("/users/statistics")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body).toEqual({
      data: {
        totalMeals: 0,
        totalMealsInsideDiet: 0,
        totalMealsOutsideDiet: 0,
        bestSequence: 0,
      },
    });
  });
});
