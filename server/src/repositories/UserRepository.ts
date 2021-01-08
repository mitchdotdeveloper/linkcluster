import { injectable } from 'inversify';
import { knex } from '../connectDB';

export type UserDTO = {
  userID: number;
  username: string;
  password: string;
  salt: string;
  refreshToken: string;
};

export interface UserRepository {
  create(
    username: string,
    password: string,
    salt: string,
    refreshToken: string
  ): Promise<Pick<UserDTO, 'userID' | 'username'> | null>;
  read(username: string): Promise<UserDTO | null>;
  exists(username: string): Promise<boolean>;
}

@injectable()
export class UserRepositoryImpl implements UserRepository {
  public async create(
    username: string,
    password: string,
    salt: string,
    refreshToken: string
  ): Promise<Pick<UserDTO, 'userID' | 'username'> | null> {
    try {
      const [user] = await knex
        .from<UserDTO>('users')
        .insert({ username, password, salt, refreshToken })
        .returning(['userID', 'username']);

      return user;
    } catch (err) {
      return null;
    }
  }

  public async read(username: string): Promise<UserDTO | null> {
    const [user] = await knex
      .from<UserDTO>('users')
      .select('userID', 'username', 'password', 'salt', 'refreshToken')
      .where({ username });

    if (!user) return null;

    return user;
  }

  public async exists(username: string) {
    const [{ count }] = await knex
      .from<UserDTO>('users')
      .count('username')
      .where({ username });

    return +count === 1;
  }
}
