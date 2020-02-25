const subStrings = [
  'hide',
  'wide',
  'gide',
  'ride',
];

function findCommonSubString(array) {
  
}

describe('findCommonSubstring', () => {
  it('finds the correct substring', () => {
    expect(findCommonSubString(subStrings)).toBe('ide');
  });
});
