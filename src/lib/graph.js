export default class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }

  addNode(node) {
    this.adjacencyList.set(node, []);
  }

  addEdge(startNode, endNode, weight = 0) {
    const hasNodes = this.adjacencyList.has(startNode) || this.adjacencyList.has(endNode);
    if (!hasNodes) {
      throw new Error('Invalid nodes');
    }

    const adjacencies = this.adjacencyList.get(startNode);
    adjacencies.push({
      node: endNode,
      weight,
    });
  }

  getNeighbors(node) {
    if (!this.adjacencyList.has(node)) {
      throw new Error('Invalid node');
    }

    return [...this.adjacencyList.get(node)];
  }
}
