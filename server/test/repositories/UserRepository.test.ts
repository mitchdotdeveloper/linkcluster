/* eslint-disable no-unused-expressions */
import 'reflect-metadata';
import { expect } from 'chai';
import { knex } from 'connectDB';
import container from 'inversify.config';
import TYPES from 'inversifyTypes';
import { afterEach, describe, test } from 'mocha';
import { UserDTO, UserRepository } from 'repositories/UserRepository';
import { SinonStub, stub } from 'sinon';

describe('UserRepository Suite', () => {
  const userRepository: UserRepository = container.get<UserRepository>(
    TYPES.UserRepository
  );

  let knexStub: SinonStub;

  afterEach(() => {
    knexStub.restore();
  });

  test('create() : creates new user in users table', async () => {
    knexStub = stub(knex, 'from').callsFake((): any => ({
      insert: stub()
        .withArgs({
          username: 'username',
          password: 'password',
          salt: 'salt',
        })
        .returnsThis(),
      returning: stub()
        .withArgs(['userID', 'username'])
        .resolves([
          {
            userID: 16,
            username: 'username',
          },
        ]),
    }));

    expect(
      await userRepository.create('username', 'password', 'salt')
    ).to.be.deep.equal(<Pick<UserDTO, 'userID' | 'username'>>{
      userID: 16,
      username: 'username',
    });
  });

  test('create() : cant create a new user in users table', async () => {
    knexStub = stub(knex, 'from').callsFake((): any => ({
      insert: stub()
        .withArgs({
          username: 'username',
          password: '',
          salt: 'salt',
        })
        .returnsThis(),
      returning: stub().withArgs(['userID', 'username']).resolves(null),
    }));
    expect(await userRepository.create('username', '', 'salt')).to.be.null;
  });

  test('read()   : finds user by the given username', async () => {
    knexStub = stub(knex, 'from').callsFake((): any => ({
      select: stub()
        .withArgs('userID', 'username', 'password', 'salt')
        .returnsThis(),
      where: stub()
        .withArgs({ username: 'usernameExists' })
        .resolves([
          {
            userID: 16,
            username: 'usernameExists',
            password: 'mySecretPassword',
            salt: 'mySecretSalt',
          },
        ]),
    }));

    expect(await userRepository.read('usernameExists')).to.be.deep.equal(<
      UserDTO
    >{
      userID: 16,
      username: 'usernameExists',
      password: 'mySecretPassword',
      salt: 'mySecretSalt',
    });
  });

  test('read()   : does not find user by the given username', async () => {
    knexStub = stub(knex, 'from').callsFake((): any => ({
      select: stub()
        .withArgs('userID', 'username', 'password', 'salt')
        .returnsThis(),
      where: stub().withArgs({ username: 'usernameDoesNotExist' }).resolves([]),
    }));
    expect(await userRepository.read('usernameDoesNotExist')).to.be.null;
  });

  test('exists() : user exists by username', async () => {
    knexStub = stub(knex, 'from').callsFake((): any => ({
      count: stub().withArgs('username').returnsThis(),
      where: stub()
        .withArgs({ username: 'usernameExists' })
        .resolves([{ count: 1 }]),
    }));
    expect(await userRepository.exists('usernameExists')).to.be.true;
  });

  test('exists() : does not find user by the given username', async () => {
    knexStub = stub(knex, 'from').callsFake((): any => ({
      count: stub().withArgs('username').returnsThis(),
      where: stub()
        .withArgs({ username: 'usernameDoesNotExist' })
        .resolves([{ count: 0 }]),
    }));
    expect(await userRepository.exists('usernameDoesNotExist')).to.be.false;
  });
});
