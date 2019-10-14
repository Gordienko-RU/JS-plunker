const buildTreeFromObject = require('./build-tree-from-object');
const GenericTreeNode = require('./generic-tree-node');

const nestedObject = {
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

describe('build tree from generic object', () => {
  it('build tree successfully', () => {
    const rootNode = buildTreeFromObject(nestedObject);
    expect(rootNode instanceof GenericTreeNode);

    expect(rootNode.data).toBe('root');
    const [firstChild, secondChild, thirdChild] = rootNode.childrens;
    
    expect(firstChild instanceof GenericTreeNode);
    expect(secondChild instanceof GenericTreeNode);
    expect(thirdChild instanceof GenericTreeNode);

    expect(firstChild.data).toBe('first');
    expect(secondChild.data).toBe('second');
    expect(thirdChild.data).toBe('third');

    expect(firstChild.childrens[0].data).toBe('val1');
    expect(firstChild.childrens[1].data).toBe('val2');
    expect(secondChild.childrens[0].data).toBe('val2');
    expect(thirdChild.childrens[0].data).toBe('val3');
  });
})
