export default (graph, startNode, goalNode) => {
  const stack = [];
 
  const visitedNodes = new Set();
  
  const parentMap = new Map();
 
  stack.push(startNode);
  visitedNodes.add(startNode);

  while (stack.length) {
    const currentNode = stack.pop();
    if (currentNode === goalNode) {
      return parentMap;
    }
   
    const neighbors = graph.getNeighbors(currentNode);
    console.log(neighbors, 'NEIGHBORS');

    /*eslint-disable*/
  
    for (let neighbor of neighbors) {
      let neighborNode = neighbor.node;

      if (visitedNodes.has(neighborNode)) {
        continue;
     
     } 

      visitedNodes.add(neighborNode);

  
    parentMap.set(neighborNode, currentNode);
 
     stack.push(neighborNode);
    }
  }
  return null;

}