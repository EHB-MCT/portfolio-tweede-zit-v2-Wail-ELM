jest.setTimeout(30000);

const { server } = require('./src/server');
const knex = require('./src/config/knex');

afterAll(async () => {
  server.close();
});
