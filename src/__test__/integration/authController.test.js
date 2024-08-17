const request = require("supertest");
const app = require("../../server");
const knex = require("../../config/knex");

describe("Auth Controller", () => {
  beforeAll(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });

  test("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "New User",
      email: "newuser@example.com",
      password: "password123",
      role: "student",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "User registered successfully");
  });

  test("should login an existing user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });
});
