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

describe("Comments Endpoints", () => {
  it("should create a comment", async () => {
    const res = await request(app)
      .post("/api/comments/1")
      .set("Authorization", `Bearer ${token}`)
      .send({
        content: "This is a comment.",
        user_id: 1,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "Comment created");
  });

  it("should fetch comments for an answer", async () => {
    const res = await request(app)
      .get("/api/comments/1")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
  });
});
