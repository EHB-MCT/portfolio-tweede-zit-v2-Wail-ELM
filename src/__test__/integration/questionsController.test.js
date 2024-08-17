const request = require("supertest");
const app = require("../../server");
const knex = require("../../config/knex");

describe("Questions Controller", () => {
  beforeAll(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });

  test("should create a question", async () => {
    const res = await request(app).post("/api/questions").send({
      content: "What is Kubernetes?",
      user_id: 1,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "Question created");
  });

  test("should fetch all questions", async () => {
    const res = await request(app).get("/api/questions");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
