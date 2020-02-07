class Item {
  constructor(weight, value, label) {
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
  for (let i = 0; i < containerSize; i++) {
    weightTable[0][i] = 0;
  }

  const setsByColumn = [];

  itemsToPick.forEach(({ label, value, weight }, rowIndex) => {
    const columnValues = [];

    // NOTE: since there is initial row and columns index starts with 0 - few alignments needed
    const relevantWeight = weight - 1;
    const aboveRowIndex = rowIndex;

    for (let columnIndex = 0; columnIndex < containerSize; columnIndex++) {
      const oldMaxCellValue = weightTable[aboveRowIndex][columnIndex];

      if (relevantWeight > columnIndex) {
        columnValues[columnIndex] = oldMaxCellValue;
        
        continue;
      }

      const maxValueOfFreeCells = (weightTable[aboveRowIndex][columnIndex - weight]) || 0;
      const potentiallyMaxValue = maxValueOfFreeCells + value;
      const isNewValueBigger = potentiallyMaxValue > oldMaxCellValue;

      columnValues[columnIndex] = isNewValueBigger
        ? potentiallyMaxValue
        : oldMaxCellValue;

      if (isNewValueBigger) {
        setsByColumn[columnIndex] = [
          ...(setsByColumn[columnIndex - weight] || []),
          label,
        ]
      }
    }

    weightTable.push(columnValues);
  });

  return { items: setsByColumn.pop(), cost: weightTable.pop().pop() }
}

describe('pick the most valuable set of items', () => {
  it('pick most valuable set', () => {
    expect(pickMostValuableSet(11, testItems)).toStrictEqual({ items: ['item5', 'item6'], cost: 3450 });
  })
});
