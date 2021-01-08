/* eslint-disable no-unused-expressions */
import 'reflect-metadata';
import container from 'inversify.config';
import TYPES from 'inversifyTypes';
import { describe, before, beforeEach, after, test } from 'mocha';
import { UserService } from 'services/UserService';
import { UserDTO, UserRepository } from 'repositories/UserRepository';
import { OmitClassMethods } from 'types';
import { expect } from 'chai';
import { User } from 'models/UserModel';

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

  test('createUser() : creates new user', async () => {
    container.bind<UserRepository>(TYPES.UserRepository).toConstantValue(<
      UserRepository
    >{
      create: (
        _username: string,
        _password: string,
        _salt: string,
        _refreshToken: string
      ) =>
        Promise.resolve<Pick<UserDTO, 'userID' | 'username'>>({
          userID: 16,
          username: 'username',
        }),
    });
    const userService: UserService = container.get<UserService>(
      TYPES.UserService
    );

    expect(
      await userService.createUser(
        'username',
        'password',
        'salt',
        '1616967e-217d-4f31-a108-0335ec0d79d7'
      )
    ).to.be.deep.equal(<OmitClassMethods<User>>{
      userID: 16,
      username: 'username',
      password: undefined,
      salt: undefined,
      refreshToken: undefined,
    });
  });

  test('createUser() : does not create a new user', async () => {
    container.bind<UserRepository>(TYPES.UserRepository).toConstantValue(<
      UserRepository
    >{
      create: (
        _username: string,
        _password: string,
        _salt: string,
        _refreshToken: string
      ) => Promise.resolve(null),
    });
    const userService: UserService = container.get<UserService>(
      TYPES.UserService
    );

    expect(
      await userService.createUser(
        'username',
        '',
        'salt',
        '1616967e-217d-4f31-a108-0335ec0d79d7'
      )
    ).to.be.null;
  });

  test('getUser()    : gets user by given username', async () => {
    container.bind<UserRepository>(TYPES.UserRepository).toConstantValue(<
      UserRepository
    >{
      read: (username: string) =>
        Promise.resolve<OmitClassMethods<UserDTO>>({
          userID: 16,
          username:
            username === 'usernameExists'
              ? 'usernameExists'
              : 'usernameDoesNotExist',
          password: 'myPassword',
          salt: 'mySalt',
          refreshToken: '1616967e-217d-4f31-a108-0335ec0d79d7',
        }),
    });
    const userService: UserService = container.get<UserService>(
      TYPES.UserService
    );

    expect(await userService.getUser('usernameExists')).to.be.deep.equal(<
      OmitClassMethods<User>
    >{
      userID: 16,
      username: 'usernameExists',
      password: 'myPassword',
      salt: 'mySalt',
      refreshToken: '1616967e-217d-4f31-a108-0335ec0d79d7',
    });
  });

  test('getUser()    : does not get user by given username', async () => {
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

  test('userExists() : user by given username exists', async () => {
    container.bind<UserRepository>(TYPES.UserRepository).toConstantValue(<
      UserRepository
    >{
      exists: (username: string) =>
        Promise.resolve<boolean>(username === 'usernameExists'),
    });
    const userService: UserService = container.get<UserService>(
      TYPES.UserService
    );

    expect(await userService.userExists('usernameExists')).to.be.true;
  });

  test('userExists() : user by given username does not exist', async () => {
    container.bind<UserRepository>(TYPES.UserRepository).toConstantValue(<
      UserRepository
    >{
      exists: (username: string) =>
        Promise.resolve<boolean>(!(username === 'usernameDoesNotExist')),
    });
    const userService: UserService = container.get<UserService>(
      TYPES.UserService
    );

    expect(await userService.userExists('usernameDoesNotExist')).to.be.false;
  });
});
