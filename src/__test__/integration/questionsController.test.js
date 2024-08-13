const request = require("supertest");
const { app, server } = require("../../server");
const knex = require("../../config/knex");

let token;

beforeAll(async () => {
  await knex.migrate.rollback();
  await knex.migrate.latest();
  await knex.seed.run();

  const res = await request(app).post("/api/auth/login").send({
    email: "test@example.com",
    password: "password123",
  });
  token = res.body.token;
});

afterAll(async () => {
  await knex.migrate.rollback();
  await knex.destroy();
  server.close();
});

describe("Questions Endpoints", () => {
  it("should create a question", async () => {
    const res = await request(app)
      .post("/api/questions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        content: "What is Docker?",
        user_id: 1,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "Question created");
  });

  it("should fetch all questions", async () => {
    const res = await request(app)
      .get("/api/questions")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
  });
});
