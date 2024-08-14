const knex = require("./config/knex");

beforeAll(async () => {
  await knex.migrate.rollback();
  await knex.migrate.latest();
  await knex.seed.run();
});

afterAll(async () => {
  await knex.migrate.rollback();
  await knex.destroy();
});

// jest.mock("./config/knex", () => {
//   return jest.fn(() => ({
//     select: jest.fn(),
//     where: jest.fn().mockReturnThis(),
//     insert: jest.fn(),
//     update: jest.fn(),
//     del: jest.fn(),
//     first: jest.fn(),
//   }));
// });
