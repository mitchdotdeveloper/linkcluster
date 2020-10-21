/* eslint-disable no-unused-expressions */
import 'reflect-metadata';
import container from 'inversify.config';
import TYPES from 'inversifyTypes';
import { describe, before, beforeEach, after, test } from 'mocha';
import { UserService } from 'services/UserService';
import { UserRepository } from 'repositories/UserRepository';
import { UserDTO } from 'models/UserModel';
import { OmitClassMethods } from 'types';
import { expect } from 'chai';

describe('UserService Suite', () => {
  before(() => {
    container.snapshot();
  });
  beforeEach(() => {
    container.unbind(TYPES.UserRepository);
  });
  after(() => {
    container.restore();
  });

  test('getUser() : gets user by given username', async () => {
    container.bind<UserRepository>(TYPES.UserRepository).toConstantValue(<
      UserRepository
    >{
      read: (username: string) =>
        Promise.resolve<OmitClassMethods<UserDTO>>({
          username:
            username === 'usernameExists'
              ? 'usernameExists'
              : 'usernameDoesNotExist',
        }),
    });
    const userService: UserService = container.get<UserService>(
      TYPES.UserService
    );

    expect(await userService.getUser('usernameExists')).to.be.deep.equal(<
      UserDTO
    >{ username: 'usernameExists' });
  });

  test('getUser() : does not get user by given username', async () => {
    container.bind<UserRepository>(TYPES.UserRepository).toConstantValue(<
      UserRepository
    >{
      read: (username: string) =>
        Promise.resolve(username === 'usernameDoesNotExist' && null),
    });
    const userService: UserService = container.get<UserService>(
      TYPES.UserService
    );

    expect(await userService.getUser('usernameDoesNotExist')).to.be.null;
  });
});
