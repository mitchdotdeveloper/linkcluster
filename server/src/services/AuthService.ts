import { injectable } from 'inversify';
import { randomBytes, scryptSync } from 'crypto';

export interface AuthService {
  hashAndSaltPassword(
    plainTextPassword: string
  ): Promise<{ hashedPassword: string; salt: string }>;
  comparePasswords(password1: string, password2: string): boolean;
}

@injectable()
export class AuthServiceImpl implements AuthService {
  public async hashAndSaltPassword(plainTextPassword: string) {
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = scryptSync(plainTextPassword, salt, 32).toString(
      'hex'
    );

    return { hashedPassword, salt };
  }

  public comparePasswords(password1: string, password2: string) {
    return password1 === password2;
  }
}
