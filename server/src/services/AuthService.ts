import { injectable } from 'inversify';
import { randomBytes, scryptSync } from 'crypto';

export interface AuthService {
  hashAndSaltPassword(
    plainTextPassword: string,
    existingSalt?: string
  ): Promise<{ hashedPassword: string; salt: string }>;
}

@injectable()
export class AuthServiceImpl implements AuthService {
  public async hashAndSaltPassword(
    plainTextPassword: string,
    existingSalt?: string
  ) {
    const salt = existingSalt ?? randomBytes(16).toString('hex');
    const hashedPassword = scryptSync(plainTextPassword, salt, 32).toString(
      'hex'
    );

    return { hashedPassword, salt };
  }
}
