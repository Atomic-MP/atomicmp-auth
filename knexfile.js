require('dotenv').config();
const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  PROD_POSTGRES_CONNECTION,
} = process.env;

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: POSTGRES_HOST,
      database: POSTGRES_DB,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: POSTGRES_DB,
      directory: './src/services/database/migrations',
    },
    seeds: {
      directory: './src/services/database/seeds',
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: POSTGRES_DB,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: POSTGRES_DB,
    },
  },

  production: {
    client: 'postgresql',
    connection: PROD_POSTGRES_CONNECTION,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: POSTGRES_DB,
      directory: './src/services/database/migrations',
    },
    seeds: {
      directory: './src/services/database/seeds',
    },
  },
};
