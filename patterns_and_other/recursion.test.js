function sum(arr) {
  if (arr.length === 1) {
    return arr[0];
  }

  return arr[0] + sum(arr.slice(1));
}

function getMaxElement(arr) {
  if (arr.length === 1) {
    return arr[0];
  }
  const maxElement = getMaxElement(arr.slice(1));

  return arr[0] > maxElement
    ? arr[0]
    : maxElement;
}

describe('recursion', () => {
  it('array handling with recursion', () => {
    expect(sum([1, 2, 3, 4])).toBe(10);
  })
  it('array handling with recursion', () => {
    expect(getMaxElement([7, 0, 3, 6, 0])).toBe(7);
  })
});
