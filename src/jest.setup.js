const knex = require('./config/knex');

beforeAll(async () => {
  await knex.migrate.rollback();
  await knex.migrate.latest();
  await knex.seed.run();
});

afterAll(async () => {
  await knex.migrate.rollback();
  await knex.destroy();
});
