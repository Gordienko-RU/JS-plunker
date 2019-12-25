const getPivotIndex = length =>
  Math.round(length / 2) - 1;

// for test purpose
let callsEmount = 0;

const quickSort = (array) => {
  callsEmount++;

  if (!array.length || array.length === 1) {
    return array;
  };

  const pivotIndex = getPivotIndex(array.length);
  const pivotElement = array[pivotIndex];

  let rightSide = [];
  let leftSide = [];
  let middle = [];

  for (const element of array) {
    if (element > pivotElement) {
      rightSide.push(element);
      continue;
    }

    if (element < pivotElement) {
      leftSide.push(element);
      continue;
    }

    middle.push(element);
  }

  return [
    ...(leftSide.length <= 1 ? leftSide : quickSort(leftSide)),
    ...middle,
    ...(rightSide.length <= 1 ? rightSide : quickSort(rightSide))
  ];
}

describe('quick sort', () => {
  beforeEach(() => {
    callsEmount = 0;
  });

  it('basic case', () => {
    // TODO: fix to be O(n * log n)
    expect(quickSort([5, 3, 4, 3, 2, 1, 10, 16, 9])).toEqual([1, 2, 3, 3, 4, 5, 9, 10, 16]);
  })
  it('call stack deep === 1 when elements are the same(O(n))', () => {
    quickSort([3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]);
    expect(callsEmount).toBe(1);
  })
});
