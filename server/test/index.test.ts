import { expect } from 'chai';
import { hello } from 'index';

describe('example test suite', () => {
  it('example test', () => {
    expect(hello('world')).to.equal('hello world');
  });
});
