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
   * @param {string} name 
   */
  constructor(name) {
    this.name = name;
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

describe('Graph', () => {
  it('creates graph node', () => {
    const node = new GraphNode('A');

    expect(node.name).toBe('A');
  })
  it('creates directed weighted edge', () => {
    const node1 = new GraphNode('A');
    const node2 = new GraphNode('B');

    node1.setEdgeTo(node2, 34);
    expect(node1.emittedEdges[0].node).toBe(node2);
    expect(node1.emittedEdges[0].weight).toBe(34);
  })
})
