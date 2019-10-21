const BFSSearch = (rootNode, value) => {
  let currentNode = rootNode;
  const queue = [];

  while(currentNode) {
    if (currentNode.data === value) {
      return currentNode;
    }

    if (currentNode.childrens.length) {
      queue.push(...currentNode.childrens);
    }
    currentNode = queue.shift();
  }
  return;
}

const DFSSearch = (node, value) => {
  if (node.data === value) {
    return node;
  } else {
    const rez = node.childrens.map(childNode => DFSSearch(childNode, value));
    console.log(rez);
  }
}

module.exports = {
  BFSSearch,
  DFSSearch,
};
