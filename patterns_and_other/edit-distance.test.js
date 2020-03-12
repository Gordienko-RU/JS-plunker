function findEditDistance(wordA, wordB) {
  const table = [];

  for (let i = 0; i < wordA.length; i++) {
    const row = [];
    const letterFromA = wordA[i];
    const isUpperRowExist = i !== 0;
    
    for (let j = 0; j < wordB.length; j++) {
      const letterFromB = wordB[j];
      const cellCost = letterFromB === letterFromA ? 0 : 1;
      const isLeftCellExist = j !== 0;
      
      // NOTE: top-left cell
      if (!isLeftCellExist && !isUpperRowExist) {
        row[j] = cellCost;

        continue;
      }
      
      const valuesToCompare = [];

      isLeftCellExist && valuesToCompare.push(row[j - 1] + 1);
      isUpperRowExist && valuesToCompare.push(table[i - 1][j] + 1);
      isUpperRowExist && isLeftCellExist
        && valuesToCompare.push(table[i - 1][j - 1] + cellCost);

      row.push(Math.min(...valuesToCompare));
    }
    table.push(row);
  }
  
  return table.pop().pop();
};

describe('#findEditDistance()', () => {
  it('should find edit distance correctly', () => {
    expect(findEditDistance('kitten', 'sitting')).toBe(3);
    expect(findEditDistance('cat', 'cot')).toBe(1);
  });
});
