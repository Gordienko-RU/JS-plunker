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
 * @param {*} containerSize 
 * @param {*} itemsToPick 
 */
function pickMostValuableSet(containerSize, itemsToPick) {

}

describe('pick the most valuable set of items', () => {
  it('pick most valuable set', () => {
    expect(pickMostValuableSet(11, testItems)).toStrictEqual(['item7', 'item6'])
  })
});
