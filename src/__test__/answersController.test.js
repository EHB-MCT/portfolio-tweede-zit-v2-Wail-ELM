const request = require('supertest');
const { app, server } = require('../server');
const knex = require('../config/knex');

beforeAll(async () => {
    await knex.migrate.latest();
    await knex.seed.run();
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
    server.close();
  });

describe('Answers Endpoints', () => {


  it('should create an answer', async () => {
    const res = await request(app)
      .post('/api/answers/1')
      .send({
        content: 'Docker is a platform for developing, shipping, and running applications.',
        user_id: 1
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Answer created');
  });

  it('should fetch answers for a question', async () => {
    const res = await request(app).get('/api/answers/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
  });
});
