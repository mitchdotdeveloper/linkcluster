import 'reflect-metadata';
import { describe, test } from 'mocha';
import { expect } from 'chai';
import { User } from 'models/UserModel';

describe('UserModel Suite', () => {
  const user: User = new User('myUsername');

  test('getUsername() : returns member username', () => {
    expect(user.getUsername()).to.be.equal('myUsername');
  });
});
