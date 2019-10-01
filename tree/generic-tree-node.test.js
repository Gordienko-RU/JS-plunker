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

  it('add children node', () => {
    rootNode.addChildrenNode(new GenericTreeNode('child'));

    expect(rootNode.childrens.length).toEqual(1);
  })

  it('remove children node', () => {
    const childNode = new GenericTreeNode('child');

    rootNode.addChildrenNode(childNode);
    expect(rootNode.childrens.length).toEqual(1);

    rootNode.removeChildrenNode(childNode);
    expect(rootNode.childrens.length).toEqual(0);
  })

  it('get parent node', () => {
    const childNode = new GenericTreeNode('child');
    rootNode.addChildrenNode(childNode);

    expect(childNode.parent == rootNode);
  })

  it('setParent', () => {
    const childNode = new GenericTreeNode('child');
    const anotherNode = new GenericTreeNode('another');

    rootNode.addChildrenNode(childNode);
    expect(rootNode.childrens[0].parent == rootNode);

    childNode.setParent(anotherNode);
    expect(rootNode.childrens.length).toEqual(0);
    expect(anotherNode.childrens[0].parent == rootNode);
    expect(childNode.parent == anotherNode);
  })

});
