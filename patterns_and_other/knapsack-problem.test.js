class Item {
  constructor(value, weight, label) {
    this.value = value;
    this.weight = weight;
    this.label = label;
  }
}

const testItems = [
  new Item(2, 100, 'item1'),
  new Item(5, 700, 'item2'),
  new Item(3, 250, 'item3'),
  new Item(4, 700, 'item4'),
  new Item(10, 3000, 'item5'),
  new Item(1, 450, 'item6'),
  new Item(3, 1000, 'item7'),
];

/**
 * @description solving classical knapsack problem with integer weight
 * @param {number} containerSize
 * @param {Item []} itemsToPick
 * @returns {string []}
 */
function pickMostValuableSet(containerSize, itemsToPick) {
  const weightTable = [[]];

  // NOTE: set initial row
  for (const i = 0; i < containerSize; i += 1) {
    weightTable[0][i] = 0;
  }

  itemsToPick.forEach(({ label, value, weight }, rowIndex) => {
    const columnValues = [];

    // TODO: not clear, rename
    const relevantWeight = weight - 1;

    for (const columnIndex = 0; columnIndex < containerSize; columnIndex += 1) {
      const oldMaxCellValue = weightTable[rowIndex][columnIndex];

      if (relevantWeight > columnIndex) {
        columnValues[columnIndex] = oldMaxCellValue;
        
        continue;
      }

      const maxValueOfFreeCells = weightTable[rowIndex][columnIndex - weight];
      const potentiallyMaxValue = maxValueOfFreeCells + value;

      columnValues[columnIndex] = potentiallyMaxValue > oldMaxCellValue
        ? potentiallyMaxValue
        : oldMaxCellValue;
    }
  });

  console.log('table', JSON.stringify(weightTable, null, 2));
}

describe('pick the most valuable set of items', () => {
  it('pick most valuable set', () => {
    expect(pickMostValuableSet(11, testItems)).toStrictEqual(['item7', 'item6'])
  })
});
