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
    // TODO: can we have nodes with same value?
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
 * @param {Object} parents 
 * @param {string} targetNodeValue
 * @returns {string []}
 */
// TODO: cover with tests
function getPath(parents, targetNodeValue) {
  const path = [targetNodeValue];
  let segment = parents[targetNodeValue];

  while(segment) {
    path.unshift(segment);
    segment = parents[segment];
  }

  return path;
}

/**
 * @description BFS used to find shortest path
 * @param {GraphNode} startNode
 * @param {string} searchValue
 * @returns {string []}
 */
function findShortestWay(startNode, searchValue) {
  const { value: startNodeValue, emittedEdges: startNodeEdges } = startNode;

  if (startNodeValue === searchValue) {
    return [startNodeValue];
  }
  const queue = [];
  const visitedNodes = [];
  const parentNodes = {};

  queue.push(...startNodeEdges);
  visitedNodes.push(startNodeValue);
  
  startNodeEdges.forEach((node) => {
    parentNodes[node.value] = startNodeValue;
  })

  while(queue.length) {
    const currentNode = queue.shift();
    const { value, emittedEdges } = currentNode;

    if (value === searchValue) {
      return getPath(parents, value);
    }

    if (visitedNodes.includes(value)) {
      continue;
    }

    visitedNodes.push(value);
    queue.push(...emittedEdges);
  }

  throw new Error(`node ${searchValue} doesn't exist`);
}

let startNode = null;

describe('Graph', () => {
  beforeEach(() => {
    startNode = new GraphNode('A');
    const node1 = new GraphNode('B');

    const node2 = new GraphNode('C');
    const node3 = new GraphNode('D');
    const node4 = new GraphNode('F');
    const node5 = new GraphNode('G');

    startNode.setEdgeTo(node1, 5);
    startNode.setEdgeTo(node2, 2);
    node2.setEdgeTo(node1, 2);
    node2.setEdgeTo(node3, 7);
    node3.setEdgeTo(node4, 5);
    node4.setEdgeTo(node5, 7);
    node1.setEdgeTo(node5, 34);
  })

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

  it('finds the shortest path to the node', () => {
    console.log('shortest path', findShortestWay(startNode, 'G'));
  })
})
