import knex from "knex";

const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = process.env;

const db = knex({
  client: "pg",
  connection: {
    database: POSTGRES_DB,
    host: POSTGRES_HOST,
    password: POSTGRES_PASSWORD,
    user: POSTGRES_USER,
  },
});

export default db;
