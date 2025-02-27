import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "../../app";
import { execSync } from "node:child_process";
import request from "supertest";

describe("Meals routes", () => {
  beforeAll(async () => {
    await app.ready();
  }, 30000);

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    execSync("npx knex migrate:rollback --all");
    execSync("npx knex migrate:latest");

    await request(app.server).post("/users/register").send({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "123456",
    });
  });

  it("should be able to create a new meal", async () => {
    const data = await request(app.server).post("/users/login").send({
      email: "john.doe@example.com",
      password: "123456",
    });

    const token = data?.body.data.token;

    await request(app.server)
      .post("/meals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Meal 1",
        description: "Description 1",
        insideDiet: true,
        date: new Date().toISOString(),
      });
  });

  it("should be able update a meal", async () => {
    const data = await request(app.server).post("/users/login").send({
      email: "john.doe@example.com",
      password: "123456",
    });

    const token = data?.body?.data?.token;

    await request(app.server)
      .post("/meals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Meal 1",
        description: "Description 1",
        insideDiet: true,
        date: new Date().toISOString(),
      });

    const listMealsResponse = await request(app.server)
      .get("/meals")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    const mealsId = listMealsResponse?.body?.data?.meals[0]?.id;

    await request(app.server)
      .put(`/meals/${mealsId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Meal 2",
        description: "Description 2",
      })
      .expect(201);
  });

  it("should be able delete a meal", async () => {
    const data = await request(app.server).post("/users/login").send({
      email: "john.doe@example.com",
      password: "123456",
    });

    const token = data?.body?.data?.token;

    await request(app.server)
      .post("/meals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Meal 1",
        description: "Description 1",
        insideDiet: true,
        date: new Date().toISOString(),
      });

    const listMealsResponse = await request(app.server)
      .get("/meals")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    const mealsId = listMealsResponse?.body?.data?.meals[0]?.id;

    await request(app.server)
      .delete(`/meals/${mealsId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);
  });

  it("should be able show specific meal", async () => {
    const data = await request(app.server).post("/users/login").send({
      email: "john.doe@example.com",
      password: "123456",
    });

    const token = data?.body?.data?.token;

    await request(app.server)
      .post("/meals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Meal 1",
        description: "Description 1",
        insideDiet: true,
        date: new Date().toISOString(),
      });
    await request(app.server)
      .post("/meals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Meal 2",
        description: "Description 2",
        insideDiet: true,
        date: new Date().toISOString(),
      });

    const listMealsResponse = await request(app.server)
      .get("/meals")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    const mealsId = listMealsResponse?.body?.data?.meals[0]?.id;

    await request(app.server)
      .get(`/meals/${mealsId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });

  it("should be update field insideDiet", async () => {
    const data = await request(app.server).post("/users/login").send({
      email: "john.doe@example.com",
      password: "123456",
    });

    const token = data?.body?.data?.token;

    await request(app.server)
      .post("/meals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Meal 1",
        description: "Description 1",
        insideDiet: true,
        date: new Date().toISOString(),
      });

    const listMealsResponse = await request(app.server)
      .get("/meals")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    const mealsId = listMealsResponse?.body?.data?.meals[0]?.id;

    await request(app.server)
      .patch(`/meals/${mealsId}/insideDiet`)
      .set("Authorization", `Bearer ${token}`)
      .send()
      .expect(201);
  });
});
