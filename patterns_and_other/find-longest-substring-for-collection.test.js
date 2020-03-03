const subStrings = [
  'hide',
  'wide',
  'gide',
  'ride',
];

function findCommonSubString(strings) {
  const pivot = strings.sort((a, b) => b.length - a.length).pop();
  let longestSubstring = '';
  const lastVisitedLatterByIndex = [];
  let lastMatchedLetterIndex = null;

  Array.from(pivot).forEach((searchLetter) => {
    let isLetterCommon = true;

    for (let i = 0; i < strings.length; i += 1) {
      const matchIndex = strings[i].indexOf(searchLetter);

      if (matchIndex === -1) {
        isLetterCommon = false;
        break;
      }

      lastVisitedLatterByIndex[i] = matchIndex;
    }
    const isSubsequenceContinued = lastMatchedLetterIndex === (i - 1);
    const isNewSubsequenceLonger = longest

    if (isLetterCommon) {

    }
  });

}

describe('findCommonSubstring', () => {
  it('finds the correct substring', () => {
    expect(findCommonSubString(subStrings)).toBe('ide');
  });
});
