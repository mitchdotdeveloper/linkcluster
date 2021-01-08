import { injectable } from 'inversify';
import { randomBytes, scryptSync } from 'crypto';
import { sign } from 'jsonwebtoken';
import { v4 } from 'uuid';

export interface AuthService {
  hashAndSaltPassword(
    plainTextPassword: string,
    existingSalt?: string
  ): Promise<{ hashedPassword: string; salt: string }>;
  signJWT(username: string, expiresIn?: string | number): string;
  generateRefreshToken(): string;
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

  public signJWT(username: string, expiresIn?: string | number) {
    return sign({ username }, process.env.JWT_SECRET!, {
      algorithm: 'HS256',
      expiresIn: expiresIn ?? '1 day',
    });
  }

  public generateRefreshToken(): string {
    return v4();
  }
}
