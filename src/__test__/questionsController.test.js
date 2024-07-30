const request = require('supertest');
const { app, server } = require('../server');
const knex = require('../config/knex');

describe('Questions Endpoints', () => {
  beforeAll(async () => {
    await knex.migrate.latest();
    await knex.seed.run();
  });

  afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
    server.close();
  });

  it('should create a question', async () => {
    const res = await request(app)
      .post('/api/questions')
      .send({
        content: 'What is Docker?',
        user_id: 1
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Question created');
  });

  it('should fetch all questions', async () => {
    const res = await request(app).get('/api/questions');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
  });
});
