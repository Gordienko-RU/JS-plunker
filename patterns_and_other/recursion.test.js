function sum(arr) {
  if (arr.length === 1) {
    return arr[0];
  }

  return arr[0] + sum(arr.slice(1));
}

describe('recursion', () => {
  it('array handling with recursion', () => {
    expect(sum([1, 2, 3, 4])).toBe(10);
  })
});
