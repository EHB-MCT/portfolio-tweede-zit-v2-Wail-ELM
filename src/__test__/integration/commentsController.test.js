const request = require("supertest");
const app = require("../../server");
const knex = require("../../config/knex");

describe("Comments Controller", () => {
  beforeAll(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });

  test("should create a comment", async () => {
    const res = await request(app).post("/api/comments").send({
      content: "This is a very insightful answer.",
      answer_id: 1,
      user_id: 1,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "Comment created");
  });

  test("should fetch comments for an answer", async () => {
    const res = await request(app).get("/api/comments/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
