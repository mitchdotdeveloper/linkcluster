import 'reflect-metadata';
import { describe, test } from 'mocha';
import { expect } from 'chai';
import { User } from 'models/UserModel';

describe('UserModel Suite', () => {
  const user: User = new User('myUsername', 'myPassword', 'mySalt');

  test('getUsername() : returns member username', () => {
    expect(user.getUsername()).to.be.equal('myUsername');
  });

  test('getPassword() : returns member password', () => {
    expect(user.getPassword()).to.be.equal('myPassword');
  });

  test('getSalt()     : returns member salt', () => {
    expect(user.getSalt()).to.be.equal('mySalt');
  });

  test('setUsername() : sets member username', () => {
    expect(user.setUsername('myNewUsername').getUsername()).to.be.equal(
      'myNewUsername'
    );
  });

  test('setPassword() : sets member password', () => {
    expect(user.setPassword('myNewPassword').getPassword()).to.be.equal(
      'myNewPassword'
    );
  });

  test('setSalt()     : sets member salt', () => {
    expect(user.setSalt('myNewSalt').getSalt()).to.be.equal('myNewSalt');
  });
});
