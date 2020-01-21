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
 * @param {Edge []} edges
 * @returns {GraphNode []}
 */
function extractNodes(edges) {
  return edges.map(({ node }) => node);
}

/**
 * @description BFS used to find shortest path
 * @param {GraphNode} startNode
 * @param {string} searchValue
 * @returns {string []}
 */
function findShortestWay(startNode, searchValue) {
  const queue = [startNode];
  const visitedNodes = [];
  const parents = {};

  while(queue.length) {
    const currentNode = queue.shift();
    const { value, emittedEdges } = currentNode;

    const connectedNodes = extractNodes(emittedEdges);

    connectedNodes.forEach((node) => {
      if (!Object.keys(parents).includes(node.value)) {
        parents[node.value] = value;
      }
    });

    if (value === searchValue) {
      return getPath(parents, value);
    }

    if (visitedNodes.includes(value)) {
      continue;
    }
    queue.push(...connectedNodes);
    visitedNodes.push(value);
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
    startNode.setEdgeTo(node5, 70);
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
    expect(findShortestWay(startNode, 'G')).toStrictEqual(['A', 'G']);
  })
})
