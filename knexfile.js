require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DEV_DB_HOST,  
      port: process.env.DEV_DB_PORT || 5432,  
      database: process.env.DEV_DB_NAME,
      user: process.env.DEV_DB_USER,
      password: process.env.DEV_DB_PASSWORD,
    },
    migrations: {
      directory: "./src/migrations",
    },
    seeds: {
      directory: "./src/seeds",
    },
  },
  production: {
    client: "pg",
    connection: {
      host: process.env.PROD_DB_HOST, 
      port: process.env.PROD_DB_PORT || 5432,  
      user: process.env.PROD_DB_USER,
      password: process.env.PROD_DB_PASSWORD,
    },
    migrations: {
      directory: "./src/migrations",
    },
    seeds: {
      directory: "./src/seeds",
    },
  },
  test: {
    client: "pg",
    connection: {
      host: 'db_test',
      DB_HOST: 'db_test',   
      port: process.env.TEST_DB_PORT || 5432,  
      database: process.env.TEST_DB_NAME,
      user: process.env.TEST_DB_USER,
      password: process.env.TEST_DB_PASSWORD,
    },
    migrations: {
      directory: "./src/migrations",
    },
    seeds: {
      directory: "./src/seeds",
    },
    pool: {
      min: 2,
      max: 10,
      acquireConnectionTimeout: 10000
    }
  },
};
