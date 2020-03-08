const subStrings = [
  'hide',
  'wide',
  'gide',
  'ider',
  'wer23423rewerwefsdevxcvwer23r@@@@@@@',
];

const subStrings1 = [
  '234kf9suicew',
  '4ng9ud98qndfitrce',
  'brefeeferfwedwd',
];

const subStrings2 = [
  '4j2;irof09342j4',
  'f3o4jrx2pud2j389eu ',
  'brefee23e2u d98u3x2du32983du v2389u 2j8ferfwedwd',
];

function findCommonSubString(strings) {
  const pivot = strings.sort((a, b) => b.length - a.length).pop();
  let longestSubstring = '';
  let currentSequence = pivot[0];
  let currentLetterIndex = 0;
  let pivotProcessed = false;
  
  while(!pivotProcessed) {
    const isCommonSubstring = strings.every(string => string.includes(currentSequence));
    pivotProcessed = currentLetterIndex === (pivot.length - 1);
    
    if (isCommonSubstring) {
      longestSubstring = currentSequence.length > longestSubstring.length
        ? currentSequence
        : longestSubstring;
      
      currentLetterIndex += 1;
      currentSequence = currentSequence + pivot[currentLetterIndex];
      
      continue;
    }  
    const shouldStartProcessingWithPreviousNumber = currentSequence.length > 1;
    
    if (!shouldStartProcessingWithPreviousNumber) {
      currentLetterIndex += 1;
    }
    currentSequence = pivot[currentLetterIndex];
  }

  return longestSubstring;
}

describe('findCommonSubstring', () => {
  it('finds the correct substring', () => {
    expect(findCommonSubString(subStrings)).toBe('de');
    expect(findCommonSubString(subStrings1)).toBe('f');
    expect(findCommonSubString(subStrings2)).toBe('2j');
  });
});
