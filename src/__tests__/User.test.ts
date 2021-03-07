import request from "supertest";
import { app } from "../app";
import { getConnection } from "typeorm";
import createConnection from "../database";

describe("Users", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it("Create Users", async () => {
    const response = await request(app).post("/users").send({
      email: "pedro@gmail.com",
      name: "Pedim",
    });
    expect(response.status).toBe(201);
  });

  it("Users Exists Email", async () => {
    const response = await request(app).post("/users").send({
      email: "pedro@gmail.com",
      name: "Pedim",
    });
    expect(response.status).toBe(400);
  });
});
