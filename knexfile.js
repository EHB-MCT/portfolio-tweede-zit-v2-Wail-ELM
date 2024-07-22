module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'forum',
      user: 'user',
      password: 'password'
    },
    migrations: {
      directory: './src/migrations'
    },
    seeds: {
      directory: './src/seeds'
    }
  },
  test: {
    client: 'pg',
    connection: {
      database: 'forum_test',
      user: 'user',
      password: 'password'
    },
    migrations: {
      directory: './src/migrations'
    },
    seeds: {
      directory: './src/seeds'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './src/migrations'
    },
    seeds: {
      directory: './src/seeds'
    }
  }
};
