const trampoline = fn => (...args) => {
  let value = fn(...args);

  while(typeof value === 'function') {
    value = value();
  }

  return value;
};

const sumBelow = (n, sum = 0) => () => n === 0
  ? sum
  : sumBelow(n - 1, sum + n);

describe('trampoline', () => {
  it('prevent stack overflow', () => {
    const wrapped = trampoline(sumBelow);

    expect(wrapped(100000000));
  })
});
