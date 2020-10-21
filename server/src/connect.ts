import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DB_URL,
});

const query = <T>(
  queryString: string,
  params: (string | number | boolean)[] = []
) => pool.query<T>(queryString, params);

export default { query };
