import request from "supertest";
import { getConnection } from "typeorm";
import { app } from "../app";
import createConnection from "../database";

describe("Surveys", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it("Create Surveys", async () => {
    const response = await request(app).post("/surveys").send({
      title: "Titilo de exemplo",
      description: "Exemplo de description",
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("Create Surveys2", async () => {
    await request(app).post("/surveys").send({
      title: "Titilo de exemplo2",
      description: "Exemplo de description2",
    });
    const response = await request(app).get("/surveys");
    expect(response.body.length).toBe(2);
  });
});
