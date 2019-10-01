const data = Symbol('data');
const childrens = Symbol('childrens');
const parent = Symbol('parent');

// TODO: add validation for cases when node already assign to parrent, and we try to setParent again
// TODO: add type-checking(most likely flow)
class GenericTreeNode {
  constructor(nodeData) {
    this[data] = nodeData;
    this[childrens] = [];
    this[parent] = null;
  }

  // TODO: think about advantages which "Symbol-private" props gave as if we use get
  get data() {
    return this[data];
  }

  get parent() {
    return this[parent];
  }

  get childrens() {
    return this[childrens];
  }

  setParent(node) {
    if (this[parent]) {
      this[parent].removeChildrenNode(this);
    }
    node.addChildrenNode(this);
  }

  addChildrenNode(node) {
    node[parent] = this;
    this[childrens].push(node);
  }

  removeChildrenNode(node) {
    this[childrens] = this[childrens].filter(childNode => childNode !== node);
  }
}

module.exports = GenericTreeNode;
