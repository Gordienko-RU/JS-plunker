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
    const { childrens } = node;

    for (let i = 0; i < childrens.length; i++) {
      const res = DFSSearch(childrens[i], value);

      if (res) {
        return res;
      }
    }
  }
}

module.exports = {
  BFSSearch,
  DFSSearch,
};
