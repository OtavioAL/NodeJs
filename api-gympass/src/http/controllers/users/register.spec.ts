import request from "supertest";
import { app } from "../../../app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Register (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to register", async () => {
    console.log("Test started");
    const response = await request(app.server).post("/users").send({
      name: "John Doe",
      email: "johndo@example.com",
      password: "123456",
    });

    console.log("Resposta do registro:", response.statusCode);

    expect(response.statusCode).toEqual(201);
  });
});
