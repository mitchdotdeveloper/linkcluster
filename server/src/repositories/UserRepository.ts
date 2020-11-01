import { injectable } from 'inversify';
import db from '../connectDB';

export type UserDTO = {
  userID: number;
  username: string;
  password: string;
  salt: string;
};

export interface UserRepository {
  create(
    username: string,
    password: string,
    salt: string
  ): Promise<Pick<UserDTO, 'userID' | 'username'> | null>;
  read(username: string): Promise<UserDTO | null>;
  exists(username: string): Promise<boolean>;
}

@injectable()
export class UserRepositoryImpl implements UserRepository {
  public async create(
    username: string,
    password: string,
    salt: string
  ): Promise<Pick<UserDTO, 'userID' | 'username'> | null> {
    const { rows, rowCount } = await db.query<
      Pick<UserDTO, 'userID' | 'username'>
    >(
      'INSERT INTO users(username, password, salt) VALUES ($1, $2, $3) RETURNING "userID", username;',
      [username, password, salt]
    );

    if (!rowCount) return null;

    return rows[0];
  }

  public async read(username: string): Promise<UserDTO | null> {
    const userFields = ['"userID"', 'username', 'password', 'salt'];
    const user = await db.query<UserDTO>(
      `SELECT ${userFields.toString()} FROM users WHERE username = $1;`,
      [username]
    );

    if (!user.rowCount) return null;

    return user.rows[0];
  }

  public async exists(username: string) {
    const { rows } = await db.query<{ count: 0 | 1 }>(
      'SELECT COUNT(1) FROM users WHERE username = $1;',
      [username]
    );
    const { count } = rows[0];

    return +count === 1;
  }
}
