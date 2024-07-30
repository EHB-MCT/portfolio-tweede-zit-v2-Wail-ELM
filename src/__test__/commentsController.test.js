const request = require('supertest');
const { app, server } = require('../server');
const knex = require('../config/knex');

describe('Comments Endpoints', () => {
  beforeAll(async () => {
    await knex.migrate.latest();
    await knex.seed.run();
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
    server.close();
  });

  it('should create a comment', async () => {
    const res = await request(app)
      .post('/api/comments/1')
      .send({
        content: 'This is a comment.',
        user_id: 1
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Comment created');
  });

  it('should fetch comments for an answer', async () => {
    const res = await request(app).get('/api/comments/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
  });
});
