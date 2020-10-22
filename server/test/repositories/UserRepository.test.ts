/* eslint-disable no-unused-expressions */
import 'reflect-metadata';
import { expect } from 'chai';
import db from 'connectDB';
import container from 'inversify.config';
import TYPES from 'inversifyTypes';
import { after, before, describe, test } from 'mocha';
import { QueryResult } from 'pg';
import { UserDTO, UserRepository } from 'repositories/UserRepository';
import { stub } from 'sinon';

describe('UserRepository Suite', () => {
  const userRepository: UserRepository = container.get<UserRepository>(
    TYPES.UserRepository
  );

  const queryStub = stub(db, 'query');

  before(() => {
    queryStub
      .withArgs(
        'INSERT INTO users(username, password, salt) VALUES ($1, $2, $3) RETURNING username;',
        ['username', 'password', 'salt']
      )
      .resolves(<QueryResult<Pick<UserDTO, 'username'>>>{
        rows: [
          {
            username: 'username',
          },
        ],
        rowCount: 1,
      });

    queryStub
      .withArgs(
        'INSERT INTO users(username, password, salt) VALUES ($1, $2, $3) RETURNING username;',
        ['username', '', 'salt']
      )
      .resolves(<QueryResult<never>>{
        rows: [],
        rowCount: 0,
      });

    queryStub
      .withArgs(
        'SELECT username,password,salt FROM users WHERE username = $1;',
        ['usernameExists']
      )
      .resolves(<QueryResult<UserDTO>>{
        rows: [
          {
            username: 'usernameExists',
            password: 'mySecretPassword',
            salt: 'mySecretSalt',
          },
        ],
        rowCount: 1,
      });

    queryStub
      .withArgs(
        'SELECT username,password,salt FROM users WHERE username = $1;',
        ['usernameDoesNotExist']
      )
      .resolves(<QueryResult<never>>{
        rows: [],
        rowCount: 0,
      });

    queryStub
      .withArgs('SELECT COUNT(1) FROM users WHERE username = $1;', [
        'usernameExists',
      ])
      .resolves(<QueryResult<{ count: 0 | 1 }>>{
        rows: [{ count: 1 }],
        rowCount: 1,
      });

    queryStub
      .withArgs('SELECT COUNT(1) FROM users WHERE username = $1;', [
        'usernameDoesNotExist',
      ])
      .resolves(<QueryResult<{ count: 0 | 1 }>>{
        rows: [{ count: 0 }],
        rowCount: 1,
      });
  });
  after(() => {
    queryStub.restore();
  });

  test('create() : creates new user in database', async () => {
    expect(
      await userRepository.create('username', 'password', 'salt')
    ).to.be.deep.equal(<Pick<UserDTO, 'username'>>{
      username: 'username',
    });
  });

  test('create() : cant create a new user in database', async () => {
    expect(await userRepository.create('username', '', 'salt')).to.be.null;
  });

  test('read() : finds user by the given username', async () => {
    expect(await userRepository.read('usernameExists')).to.be.deep.equal(<
      UserDTO
    >{
      username: 'usernameExists',
      password: 'mySecretPassword',
      salt: 'mySecretSalt',
    });
  });

  test('read() : does not find user by the given username', async () => {
    expect(await userRepository.read('usernameDoesNotExist')).to.be.null;
  });

  test('exists() : user exists by username', async () => {
    expect(await userRepository.exists('usernameExists')).to.be.true;
  });

  test('exists() : does not find user by the given username', async () => {
    expect(await userRepository.exists('usernameDoesNotExist')).to.be.false;
  });
});
