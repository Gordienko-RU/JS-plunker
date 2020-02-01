const requiredTestItems = new Set([1, 2, 3, 4, 5]);

const testSets = new Set([
  new Set([1, 3, 9]),
  new Set([5, 2, 9]),
  new Set([3, 4, 9, 7]),
  new Set([1, 2]),
  new Set([2, 5, 4, 9, 6, 0]),
  new Set([8, 4, 2]),
  new Set([2, 5, 0, 9, 1]),
  new Set([2]),
]);

function intersection(setA, setB) {
  let _intersection = new Set()
  for (let elem of setB) {
      if (setA.has(elem)) {
          _intersection.add(elem)
      }
  }
  return _intersection
}

function difference(setA, setB) {
  let _difference = new Set(setA)
  for (let elem of setB) {
      _difference.delete(elem)
  }
  return _difference
}

/**
 * @param {Set<Set<number>>} sets
 * @param {Set<number>} requiredItems
 * @returns {Set<number> []}
 */
function determineSetCoverage(sets, requiredItems) {
  const finalCombination = [];
  let itemsToCover = new Set(requiredItems);
  const availableSets = new Set(sets);

  // TODO: too much Array.from, refactor
  while(Array.from(itemsToCover).length) {
    const nextOptimalSet = Array.from(availableSets).reduce((acc, set) =>
      Array.from(intersection(acc, itemsToCover)).length < Array.from(intersection(set, itemsToCover)).length ? set : acc);

    finalCombination.push(nextOptimalSet);
    availableSets.delete(nextOptimalSet);
    itemsToCover = difference(itemsToCover, nextOptimalSet);
  }

  return finalCombination;
}

describe('set cover-problem', () => {
  it('founded sets cover all required items', () => {
    expect(determineSetCoverage(testSets, requiredTestItems)).toStrictEqual([
      new Set([2, 5, 4, 9, 6, 0]),
      new Set([1, 3, 9]),
    ]);
  });
});
