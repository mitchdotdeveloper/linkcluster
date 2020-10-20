import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgresql://postgres:postgres@localhost/linkcluster',
});

const query = <T>(
  queryString: string,
  params: (string | number | boolean)[] = []
) => pool.query<T>(queryString, params);

export default { query };
