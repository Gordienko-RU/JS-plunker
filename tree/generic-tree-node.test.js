const GenericTreeNode = require('./generic-tree-node');

let rootNode = null;
const initializeTree = () => {
  rootNode = new GenericTreeNode('root');
}

describe('GenericTreeNode', () => {
  beforeEach(initializeTree);

  it('get node data', () => {
    expect(rootNode.data).toEqual('root');
  })
  it('get node data', () => {
    expect(rootNode.data).toEqual('root');
  })
  it('get node data', () => {
    expect(rootNode.data).toEqual('root');
  })
  it('get node data', () => {
    expect(rootNode.data).toEqual('root');
  })

});
