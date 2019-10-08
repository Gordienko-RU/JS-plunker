const buildTreeFromObject = require('./build-tree-from-object');
const GenericTreeNode = require('./generic-tree-node');

const nestedObject = {
  root: {
    first: {
      child1: 'child1',
    },
    second: {
      child1: 'child1',
    },
    third: {
      child3: 'child3',
    },
  }
}

describe('build tree from generic object', () => {
  it('build tree successfully', () => {
    const rootNode = buildTreeFromObject(nestedObject);

    expect(rootNode.data).toBe('root');
    const [firstChild, secondChild, thirdChild] = rootNode.childrens;
  
    expect(firstChild.data).toBe('first');
    expect(secondChild.data).toBe('first');
    expect(thirdChild.data).toBe('first');
  });
})
