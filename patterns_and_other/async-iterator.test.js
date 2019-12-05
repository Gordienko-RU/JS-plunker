const obj = {
  [Symbol.asyncIterator]: async function* asyncGenerator() {
    const values = [Promise.resolve(1)];

    while (values.length) {
      yield await values.shift();
    }
  },
  [Symbol.iterator]: function* generator() {
    const values = [2];

    while (values.length) {
      yield values.shift();
    }
  } 
}

describe('async iterator', () => {
  it('both async & sync iterators on the same object are called correctly', () => {
    for (const value of obj) {
      expect(value).toBe(2);
    };
    (
      async function () {
        for await (const value of obj) {
          expect(value).toBe(1);
        }
      }
    )();
  })
});
