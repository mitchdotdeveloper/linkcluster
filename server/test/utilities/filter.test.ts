import { describe, test } from 'mocha';
import { expect } from 'chai';
import { stripSensitiveProperties } from 'utilities/filter';

describe('utilities/filter Suite', () => {
  test('stripSensitiveProperties() : returns passed in object without keys prefixed with `_`', () => {
    const startingObject = {
      _sensitiveProperty1: true,
      _sensitiveProperty2: true,
      nonSensitiveProperty1: true,
      nonSensitiveProperty2: true,
    };

    expect(stripSensitiveProperties(startingObject)).to.be.deep.equal({
      nonSensitiveProperty1: true,
      nonSensitiveProperty2: true,
    });
  });
});
