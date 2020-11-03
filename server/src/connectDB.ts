import { Pool } from 'pg';
import Knex from 'knex';

export const knex = Knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DB_URL,
  },
});

const pool = new Pool({
  connectionString: process.env.DB_URL,
});

const query = <T>(
  queryString: string,
  params: (string | number | boolean)[] = []
) => pool.query<T>(queryString, params);

export default { query };
