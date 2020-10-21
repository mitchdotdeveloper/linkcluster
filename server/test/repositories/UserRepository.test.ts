/* eslint-disable no-unused-expressions */
import 'reflect-metadata';
import { expect } from 'chai';
import db from 'connectDB';
import container from 'inversify.config';
import TYPES from 'inversifyTypes';
import { after, before, describe, test } from 'mocha';
import { UserDTO } from 'models/UserModel';
import { QueryResult } from 'pg';
import { UserRepository } from 'repositories/UserRepository';
import { stub } from 'sinon';

describe('UserRepository Suite', () => {
  const userRepository: UserRepository = container.get<UserRepository>(
    TYPES.UserRepository
  );

  const queryStub = stub(db, 'query');

  before(() => {
    // successful query
    queryStub
      .withArgs('SELECT username FROM users WHERE username = $1;', [
        'usernameExists',
      ])
      .resolves(<QueryResult<UserDTO>>{
        rows: [{ username: 'usernameExists' }],
        rowCount: 1,
      });

    // unsuccessful query
    queryStub
      .withArgs('SELECT username FROM users WHERE username = $1;', [
        'usernameDoesNotExist',
      ])
      .resolves(<QueryResult<never>>{
        rows: [],
        rowCount: 0,
      });
  });
  after(() => {
    queryStub.restore();
  });

  test('read() : finds user by the given username', async () => {
    expect(await userRepository.read('usernameExists')).to.be.deep.equal(<
      UserDTO
    >{ username: 'usernameExists' });
  });

  test('read() : does not find user by the given username', async () => {
    expect(await userRepository.read('usernameDoesNotExist')).to.be.null;
  });
});
