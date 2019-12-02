const { measureTime } = require('../helpers');

let value = null;

function assingValue(param) {
  value = param;
}

const objectLiteral = {
  prop1: 'value',
  prop2: 'value',
  prop3: 'value',
  prop4: 'value',
  prop5: 'value',
  prop6: 'value',
  prop7: 'value',
  prop8: 'value',
  prop9: 'value',
  prop10: 'value',
  prop11: 'value',
  prop12: 'value',
  prop13: 'value',
  prop14: 'value',
  prop15: 'value',
  prop16: 'value',
  prop17: 'value',
  prop18: 'value',
  prop19: 'value',
  prop20: 'value',
};

const json = JSON.stringify(objectLiteral, null, 2);

describe('JSON parsing', () => {
  it('parses JSON faster than object literal', () => {
    const objectLiteralTiming = measureTime(null, assingValue, objectLiteral);

    value = null;

    const jsonTiming = measureTime(null, assingValue, JSON.parse(json));

    expect(objectLiteralTiming > jsonTiming);
  })
})