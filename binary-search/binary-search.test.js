const binarySearch = require('./binary-search');
const { measureTime } = require('../helpers');

const testCollection = [];
const COLLECTION_LENGTH = 200;

for (let i = 0; i < COLLECTION_LENGTH; i++) {
  testCollection.push({
    value: i,
    text: `test-${i}`,
  });
}

describe('binary search', () => {
  it('search value', () => {
    const { node, stepsCount } = binarySearch(testCollection, 14);

    expect(node.text).toBe('test-14');
    expect(stepsCount <= Math.round(Math.log(COLLECTION_LENGTH))); // O(log n)
  });

  it('faster than Array.prototype.find() on sorted array', () => {
    const nativeSearchTime = measureTime(
      testCollection,
      'find',
      item => item.value === 14,
    );
    const binarySearchTime = measureTime(null, binarySearch, testCollection, 14);

    expect(nativeSearchTime > binarySearchTime);
  })
});

