const getMiddleIndex = collection =>
  (collection.length % 2)
    ? (collection.length - 1) / 2
    : (collection.length / 2);

const binarySearch = (sortedCollection, searchValue) => {
  let actualRange = sortedCollection;
  let middleElementIndex = getMiddleIndex(actualRange);
  let stepsCount = 0;

  while(middleElementIndex) {
    stepsCount++;
    const middleElement = actualRange[middleElementIndex];
    const { value } = middleElement;

    if (value === searchValue) {
      return { node: middleElement, stepsCount };
    }
    actualRange =  searchValue > value
      ? actualRange.slice(middleElementIndex - 1)
      : actualRange.slice(0, middleElementIndex)
    middleElementIndex = getMiddleIndex(actualRange);
  }
}

module.exports = binarySearch;
