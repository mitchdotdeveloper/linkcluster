import 'reflect-metadata';
import { expect } from 'chai';
import { hello } from 'controllers/UserController';

describe('example test suite', () => {
  it('example test', () => {
    expect(hello('world')).to.equal('hello world');
  });
});
