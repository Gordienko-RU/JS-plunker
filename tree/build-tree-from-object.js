const GenericTreeNode = require('./generic-tree-node');

/**
 * @typedef GenericTreeNode
 * @property {Function} setParent
 */

/**
 * @descrription object traversing in DFS style
 * @param {*} value 
 * @param {GenericTreeNode} parent 
 * @param {string} key 
 * @returns {undefined}
 */
const traverse = (value, parent, key) => {
  let nodeValue = null;
  let childKeys = null;

  if (typeof value !== "Object") {
    nodeValue = value;
  } else {
    nodeValue = key;
    childKeys = Object.keys(value);
  }
  const node = GenericTreeNode(nodeValue);
  node.setParent(parent);

  if (!childKeys || !childKeys.length) {
    return;
  }

  childKeys.forEach(key => traverse(value[key], node, key));
}

/**
 * @param {*} obj - tree-like object with single root property
 * @returns {GenericTreeNode} - root node
 */
const buildTreeFromObject = (obj) => {
  const keys = Object.keys(obj);
  
  if (keys.length > 1) {
    throw new Error('only one root node allowed');
  }

  if (!keys.length) {
    return;
  }
  const rootKey = Object.keys(obj)[0];
  const rootNode = GenericTreeNode(keys[0]);

  Object.keys(obj[rootKey]).forEach(key => traverse(obj[rootKey][key], rootNode, key));

  return rootNode;
}

module.exports = buildTreeFromObject;
