class Edge {
  /**
   * @param {GraphNode} node 
   * @param {number} weight 
   */
  constructor(node, weight) {
    this.node = node;
    this.weight = weight;
  }
}

/**
 * @description directed weighted
 */
class GraphNode {
  /**
   * @param {string} value 
   */
  constructor(value) {
    this.value = value;
    // NOTE: each node contains only info regarding emitted edges
    this.emittedEdges = [];
  }

  /**
   * @param {GraphNode} node 
   * @param {number} weight 
   */
  setEdgeTo(node, weight) {
    this.emittedEdges.push(new Edge(node, weight));
  }
}

/**
 * @description BFS used to find shortest path
 * @param {GraphNode} startNode
 * @param {string} searchValue
 * @returns {string []}
 */
function findShortestWay(startNode, searchValue) {
  if (startNode.value === searchValue) {
    return [startNode.value];
  }

  const queue = [];
  const visitedNodes = [];
  const parentNodes = {};

  queue.push(...startNode.emittedEdges);
  visitedNodes.push(startNode.value);
  
  startNode.emittedEdges.forEach((node) => {
    
  })

  while(queue.length) {
    const currentNode = queue.shift();
    
    if (visitedNodes.includes(currentNode.value)) {
      continue;
    }



    if () {

    }
  }
}

describe('Graph', () => {
  it('creates graph node', () => {
    const node = new GraphNode('A');

    expect(node.value).toBe('A');
  })
  it('creates directed weighted edge', () => {
    const node1 = new GraphNode('A');
    const node2 = new GraphNode('B');

    node1.setEdgeTo(node2, 34);
    expect(node1.emittedEdges[0].node).toBe(node2);
    expect(node1.emittedEdges[0].weight).toBe(34);
  })
})
