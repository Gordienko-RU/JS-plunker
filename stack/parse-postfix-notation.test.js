const parsePostfixNotation = require('./parse-postfix-notation');

describe('parse postfix expression', () => {
  it('1 2 + = 3', () => {
    expect(parsePostfixNotation('1 2 +')).toEqual(3);
  });

  it('7 8 + 3 / 4 * = 20', () => {
    expect(parsePostfixNotation('7 8 + 3 / 4 *')).toEqual(20);
  });
});