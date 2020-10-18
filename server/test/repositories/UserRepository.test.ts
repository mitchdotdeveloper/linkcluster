/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import db from 'connect';
import { test } from 'mocha';
import { UserDTO } from 'models/UserModel';
import { QueryResult } from 'pg';
import 'reflect-metadata';
import {
  UserRepository,
  UserRepositoryImpl,
} from 'repositories/UserRepository';
import sinon from 'sinon';

const userRepository: UserRepository = new UserRepositoryImpl();

const queryStub = sinon.stub(db, 'query');

describe('UserRepository Suite', () => {
  before(async () => {
    queryStub
      .withArgs('SELECT username FROM users WHERE username = $1;', [
        'usernameExists',
      ])
      .resolves(<QueryResult<UserDTO>>{
        rows: [{ username: 'usernameExists' }],
        rowCount: 1,
      });

    queryStub
      .withArgs('SELECT username FROM users WHERE username = $1;', [
        'usernameDoesNotExist',
      ])
      .resolves(<QueryResult>{
        rowCount: 0,
      });
  });

  after(() => {
    queryStub.resetBehavior();
  });

  test('read() finds the given username', async () => {
    expect(await userRepository.read('usernameExists')).to.deep.equal(<UserDTO>{
      username: 'usernameExists',
    });
  });

  test('read() does not find the given username', async () => {
    expect(await userRepository.read('usernameDoesNotExist')).to.be.null;
  });
});
``;
