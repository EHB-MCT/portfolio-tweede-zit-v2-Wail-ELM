const request = require("supertest");
const app = require("../../server");
const knex = require("../../config/knex");

describe("Answers Controller", () => {
  beforeAll(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });

  test("should create an answer", async () => {
    const res = await request(app).post("/api/answers").send({
      content: "Kubernetes is a tool.",
      question_id: 1,
      user_id: 1,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "Answer created");
  });

  test("should fetch answers for a question", async () => {
    const res = await request(app).get("/api/answers/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
