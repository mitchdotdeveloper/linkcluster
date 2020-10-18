/* eslint-disable no-unused-expressions */
import { describe, test } from 'mocha';
import { expect } from 'chai';
import { User } from 'models/UserModel';

const user: User = new User('myUsername');

describe('UserModel Suite', () => {
  test('getUsername() returns member username', () => {
    expect(user.getUsername()).to.be.equal('myUsername');
  });
});
