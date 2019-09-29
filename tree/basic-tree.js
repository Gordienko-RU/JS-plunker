const data = Symbol('data');
const childrens = Symbol('childrens');
const parent = Symbol('parent');

class Node {
  constructor(data) {
    this[data] = data;
    this[childrens] = null;
    this[parent] = null;
  }
}

module.exports = Node;
