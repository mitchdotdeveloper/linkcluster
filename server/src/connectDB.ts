import Knex from 'knex';

export const knex = Knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DB_URL,
  },
});
