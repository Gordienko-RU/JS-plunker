const binarySearch = require('./binary-search');

const testCollection = [];
const COLLECTION_LENGTH = 100;

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
});

