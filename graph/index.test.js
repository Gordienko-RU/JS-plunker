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
// TODO: use references, not strings
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

/**
 * @param {Map} costs
 * @param {Set} visitedNodes
 * @returns {GraphNode | null}
 */
function pickCheapestNode(costs, visitedNodes) {
  const cheapestNode = Array.from(costs).reduce((acc, [node, cost]) => {
    const currentCheapestCost = costs.get(acc);

    return !visitedNodes.has(node) && (cost < currentCheapestCost || !currentCheapestCost)
      ? node
      : acc;
  }, {});

  return cheapestNode instanceof GraphNode
    ? cheapestNode
    : null;
}

/**
 * @param {Map} parents 
 * @param {GraphNode} targetNode
 * @returns {string []}
 */
function getPathFromMaps(parents, targetNode) {
  const path = [targetNode.value];
  let segment = parents.get(targetNode);

  while(segment) {
    path.unshift(segment.value);
    segment = parents.get(segment);
  }

  return path;
}

/**
 * @description Dijkstra used to find cheapest path
 * @param {GraphNode} startNode
 * @param {GraphNode} targetNode
 * @returns {string []}
 */
function findCheapestPath(startNode, targetNode) {
  const queue = [startNode];
  const visitedNodes = new Set();
  const parents = new Map();
  const costs = new Map();
  costs.set(startNode, 0);

  while (queue.length) {
    const processedNode = queue.shift();

    if (processedNode === targetNode) {
      return {
        path: getPathFromMaps(parents, processedNode),
        cost: costs.get(processedNode),
      }
    }

    const { emittedEdges } = processedNode;
    const processedNodeCost = costs.get(processedNode);

    for (const edge of emittedEdges) {
      const { node, weight } = edge;
      const newCost = processedNodeCost + weight;
      const oldCost = costs.get(node);

      if (!oldCost || (oldCost > newCost)) {
        costs.set(node, newCost);
        parents.set(node, processedNode);
      }
    }
    
    visitedNodes.add(processedNode);
    const cheapestNode = pickCheapestNode(costs, visitedNodes);

    if (!cheapestNode) {
      throw new Error(`there is no path between ${startNode.value} and ${targetNode.value}`);
    }
    queue.push(cheapestNode);
  }
}

let startNode = null;
let finishNode = null;

describe('Graph', () => {
  beforeEach(() => {
    startNode = new GraphNode('A');
    const node1 = new GraphNode('B');
    const node2 = new GraphNode('C');
    const node3 = new GraphNode('D');
    const node4 = new GraphNode('F');
    finishNode = new GraphNode('G');

    startNode.setEdgeTo(node1, 5);
    startNode.setEdgeTo(node2, 2);
    startNode.setEdgeTo(finishNode, 70);
    node2.setEdgeTo(node1, 2);
    node2.setEdgeTo(node3, 7);
    node3.setEdgeTo(node4, 5);
    node4.setEdgeTo(finishNode, 7);
    node1.setEdgeTo(finishNode, 34);
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

  it('finds the cheapest path to the node', () => {
    expect(findCheapestPath(startNode, finishNode)).toStrictEqual({ path: ['A', 'C', 'D', 'F', 'G'], cost: 21 });
  })
})
