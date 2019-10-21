const mockObj = {
  root: {
    first: {
      child1: 'val1',
      child2: 'val2',
      child3: {
        child1: 'val3',
        child2: {
          child1: 'val1',
        }
      }
    },
    second: {
      child1: 'val2',
    },
    third: {
      child3: 'val3',
    },
  }
}

function* generateSequence() {
  for (let i = 0; true; i++) {
    yield i;
  }
};

/**
 * @description to generate nested object of unique identifiers
 * @param { Object } param0
 * @param { number } param0.deepLevel
 * @param { number } param0.branchCount
 * @param { Object } param0.targetObj
 * @returns { Object } - populated object
 */
const populateObjectWithUniquesIdBranches = ({ deepLevel, branchCount, targetObj }) => {
  const uniqIdGen = generateSequence();

  for (let i = 0; i < branchCount; i++) {
    let deepCounter = 0;
    let linkToLastTarget = targetObj;

    while(deepCounter < deepLevel) {
      const { value } = uniqIdGen.next();
      linkToLastTarget[value] = deepCounter + 1 < deepLevel ? {} : String(value);
      linkToLastTarget = linkToLastTarget[value];
      deepCounter++;
    }
  }
  return targetObj;
}

module.exports = {
  mockObj,
  populateObjectWithUniquesIdBranches,
  buildTreeFromObject: require('./build-tree-from-object'),
}
