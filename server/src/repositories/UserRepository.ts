import { injectable } from 'inversify';
import db from '../connect';
import { UserDTO } from '../models/UserModel';

export interface UserRepository {
  read(username: string): Promise<UserDTO | null>;
}

@injectable()
export class UserRepositoryImpl implements UserRepository {
  async read(username: string): Promise<UserDTO | null> {
    const user = await db.query<UserDTO>(
      'SELECT username FROM users WHERE username = $1;',
      [username]
    );

    if (!user.rowCount) return null;

    return user.rows[0];
  }
}
