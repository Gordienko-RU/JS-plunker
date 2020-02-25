/**
 * @description handy when it's needed to recognize how similar two words are
 * NOTE: implemented using DP
 * @param {string} a 
 * @param {string} b
 * @returns {number}
 */
function getLongestCommonSubstringLength(wordA, wordB) {
  const matrix = [];
  let longestSubstringLength = 0;

  for (let i = 0; i < wordA.length; i++) {
    const letterMattches = [];

    for (let j = 0; j < wordB.length; j++) {
      const currentLetterResult = wordA[i] === wordB[j] ? 1 : 0;
      const previousLetterResult = (i === 0 || j === 0) ? 0 : matrix[i - 1][j - 1];
      const currentSubstringLength = currentLetterResult + previousLetterResult;

      if (currentSubstringLength > longestSubstringLength) {
        longestSubstringLength = currentSubstringLength;
      }

      letterMattches.push(currentLetterResult === 0
        ? 0
        : currentLetterResult + previousLetterResult);
    }
    matrix.push(letterMattches);
  }

  return longestSubstringLength;
}

describe('getLongestCommonSubstringLength', () => {
  it('finds substring length correctly', () => {
    expect(getLongestCommonSubstringLength('find', 'bind')).toBe(3);
    expect(getLongestCommonSubstringLength('jojoerwdqwqwqwqw', 'qwqr')).toBe(3);
  })
})
