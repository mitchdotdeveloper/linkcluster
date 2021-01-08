import 'reflect-metadata';
import { describe, test } from 'mocha';
import { expect } from 'chai';
import { User } from 'models/UserModel';

describe('UserModel Suite', () => {
  const user: User = new User(
    16,
    'myUsername',
    'myPassword',
    'mySalt',
    '1616967e-217d-4f31-a108-0335ec0d79d7'
  );

  test('getUserID()       : returns member userID', () => {
    expect(user.getUserID()).to.be.equal(16);
  });

  test('getUsername()     : returns member username', () => {
    expect(user.getUsername()).to.be.equal('myUsername');
  });

  test('getPassword()     : returns member password', () => {
    expect(user.getPassword()).to.be.equal('myPassword');
  });

  test('getSalt()         : returns member salt', () => {
    expect(user.getSalt()).to.be.equal('mySalt');
  });

  test('getRefreshToken() : returns member refreshToken', () => {
    expect(user.getRefreshToken()).to.be.equal(
      '1616967e-217d-4f31-a108-0335ec0d79d7'
    );
  });

  test('setUserID()       : sets member userID', () => {
    expect(user.setUserID(15).getUserID()).to.be.equal(15);
  });

  test('setUsername()     : sets member username', () => {
    expect(user.setUsername('myNewUsername').getUsername()).to.be.equal(
      'myNewUsername'
    );
  });

  test('setPassword()     : sets member password', () => {
    expect(user.setPassword('myNewPassword').getPassword()).to.be.equal(
      'myNewPassword'
    );
  });

  test('setSalt()         : sets member salt', () => {
    expect(user.setSalt('myNewSalt').getSalt()).to.be.equal('myNewSalt');
  });

  test('setRefreshToken() : sets member refreshToken', () => {
    expect(
      user
        .setRefreshToken('1616967e-217d-4f31-a108-0335ec0d79d7')
        .getRefreshToken()
    ).to.be.equal('1616967e-217d-4f31-a108-0335ec0d79d7');
  });
});
