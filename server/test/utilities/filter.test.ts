import { describe, test } from 'mocha';
import { expect } from 'chai';
import {
  stripBlacklistedProperties,
  stripFalsyProperties,
  stripNullOrUndefinedProperties,
} from 'utilities/filter';

describe('utilities/filter Suite', () => {
  test('stripBlacklistedProperties()     : returns passed in object without keys listed in blacklist', () => {
    const startingObject = {
      sensitiveProperty1: true,
      sensitiveProperty2: true,
      nonSensitiveProperty1: true,
      nonSensitiveProperty2: true,
    };

    expect(
      stripBlacklistedProperties(startingObject, [
        'sensitiveProperty1',
        'sensitiveProperty2',
      ])
    ).to.be.deep.equal({
      nonSensitiveProperty1: true,
      nonSensitiveProperty2: true,
    });
  });

  test('stripNullOrUndefinedProperties() : returns passed in object without properties that are null or undefined', () => {
    const startingObject = {
      nullProperty: null,
      undefinedProperty: undefined,
      property1: true,
      property2: true,
    };

    expect(stripNullOrUndefinedProperties(startingObject)).to.be.deep.equal({
      property1: true,
      property2: true,
    });
  });

  test('stripFalsyProperties()           : returns passed in object without properties that are null or undefined', () => {
    const startingObject = {
      falsyProperty1: null,
      falsyProperty2: undefined,
      falsyProperty3: '',
      falsyProperty4: 0,
      falsyProperty5: false,
      falsyProperty6: NaN,
      truthyProperty: 'ImTruthy',
    };

    expect(stripFalsyProperties(startingObject)).to.be.deep.equal({
      truthyProperty: 'ImTruthy',
    });
  });
});
