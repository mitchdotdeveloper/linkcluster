/* eslint-disable no-unused-expressions */
import 'reflect-metadata';
import container from 'inversify.config';
import TYPES from 'inversifyTypes';
import { describe, test } from 'mocha';
import type { AuthService } from 'services/AuthService';
import { expect } from 'chai';
import { verify } from 'jsonwebtoken';

describe('AuthService Suite', () => {
  test('hashAndSaltPassword() : creates hashed password and salt', async () => {
    const authService: AuthService = container.get<AuthService>(
      TYPES.AuthService
    );

    expect(await authService.hashAndSaltPassword('password')).keys([
      'hashedPassword',
      'salt',
    ]);
  });

  test('hashAndSaltPassword() : creates idempotent hashed password when a salt argument is passed', async () => {
    const authService: AuthService = container.get<AuthService>(
      TYPES.AuthService
    );

    const { hashedPassword, salt } = await authService.hashAndSaltPassword(
      'password'
    );

    expect(
      await authService.hashAndSaltPassword('password', salt)
    ).to.be.deep.equal({ hashedPassword, salt });
  });

  test('signJWT() : creates new JWT with username', async () => {
    process.env.JWT_SECRET =
      'be3a717845b086a0d1af87f196ed02b1be189b0b6f356cfae0405471fc43ebb2';
    const authService: AuthService = container.get<AuthService>(
      TYPES.AuthService
    );

    const jwt = authService.signJWT('mitch', 1);

    const { username } = verify(jwt, process.env.JWT_SECRET) as {
      username: string;
    };
    expect(username).to.be.equal('mitch');
  });

  test('generateRefreshToken() : creates new refreshToken', async () => {
    const authService: AuthService = container.get<AuthService>(
      TYPES.AuthService
    );

    expect(authService.generateRefreshToken()).to.be.lengthOf(36);
  });
});
