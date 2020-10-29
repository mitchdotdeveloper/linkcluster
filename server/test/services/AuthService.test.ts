/* eslint-disable no-unused-expressions */
import 'reflect-metadata';
import container from 'inversify.config';
import TYPES from 'inversifyTypes';
import { describe, test } from 'mocha';
import type { AuthService } from 'services/AuthService';
import { expect } from 'chai';

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
});
