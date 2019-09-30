const data = Symbol('data');
const childrens = Symbol('childrens');
const parent = Symbol('parent');

// TODO: add type-checking(most likely flow)
class GenericTreeNode {
  constructor(nodeData) {
    this[data] = nodeData;
    this[childrens] = null;
    this[parent] = null;
  }

  get data() {
    return this[data];
  }

  get parent() {
    return this[parent];
  }

  set parent(node) {
    this[parent] = node;
  }

  get childrens() {
    return this[childrens];
  }

  addChildrenNode(node) {
    node.setParentNode = this;
    this[childrens].push(node);
  }
}

module.exports = GenericTreeNode;
