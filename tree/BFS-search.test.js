const {
  populateObjectWithUniquesIdBranches,
  buildTreeFromObject,
} = require('./mock');
const GenericTreeNode = require('./generic-tree-node');
const search = require('./BFS-search');

const root = populateObjectWithUniquesIdBranches({
  deepLevel: 10,
  branchCount: 10,
  targetObj: {},
});
const genericTree = buildTreeFromObject({ root });

describe('searching in generic hierarchy tree with BST', () => {
  it('search node by value successfullly', () => {
    const rez = search(genericTree, 14);

    expect(rez instanceof GenericTreeNode);
    expect(rez.data).toBe(14);
  });
})