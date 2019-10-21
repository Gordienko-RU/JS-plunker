const {
  populateObjectWithUniquesIdBranches,
  buildTreeFromObject,
} = require('./mock');
const GenericTreeNode = require('./generic-tree-node');
const { BFSSearch, DFSSearch } = require('./hierarchy-search');

const root = populateObjectWithUniquesIdBranches({
  deepLevel: 10,
  branchCount: 10,
  targetObj: {},
});
const genericTree = buildTreeFromObject({ root });

describe('searching in generic hierarchy tree with', () => {
  it('BFS', () => {
    const rez = BFSSearch(genericTree, '14');

    expect(rez instanceof GenericTreeNode);
    expect(rez.data).toBe('14');
  });

  it('DFS', () => {
    const rez = DFSSearch(genericTree, '14');

    expect(rez instanceof GenericTreeNode);
    expect(rez.data).toBe('14');
  });
})