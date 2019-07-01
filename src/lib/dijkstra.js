'use strict';

const PriorityQueue = require('js-priority-queue');

module.exports = (graph, startNode, goalNode) => {
  // Creating a set to hold the nodes that we have visited - a set has to have unique keys
  const visitedNodes = new Set();
  // Creating a Map to hold the paths
  const parentMap = new Map();
  // Creating another map to hold the shortest route found so far (least number of edges hit or the lightest weight path)
  const shortestPathSoFar = new Map();
  // 
  const priorityQueue = new PriorityQueue({
    comparator: (a, b) => a.priority - b.priority,
  });

  // sets properties for a priority queue. Node will be the starting node passed in from above
  priorityQueue.queue({
    node: startNode,
    priority: 0,
  });

  // sets the shortest path equal to the start node passed in from above and its priority
  shortestPathSoFar.set(startNode, 0);
  // while there are nodes in the priority queue, do this logic (the first time around, this will happen because we started a new priority queue with the startNode above)
  while (priorityQueue.length > 0) {
    // take out the node at the beginning of the queue and set it to current node so we can reference it
    const currentNode = priorityQueue.dequeue().node;
    // Checking to see if the current node is listed in the visited nodes set. If so restart at the top of the while loop
    if (visitedNodes.has(currentNode)) { continue; } /*eslint-disable-line*/
    // Add current node to the visited nodes set so it will not be visited again
    visitedNodes.add(currentNode);
    // If the current node is the node we are looking for, return the path to this node.
    if (currentNode === goalNode) { return parentMap; }
    // set neighbors to be the neighbors of the current node
    const neighbors = graph.getNeighbors(currentNode);

    /*eslint-disable*/
    // This will loop through the neighbors set
    for (const neighbor of neighbors) {
      // setting the weight and neighbor node vars
      const neighborWeight = neighbor.weight;
      const neighborNode = neighbor.node;
      // if the visited node has neighbors, continue with the with the for of loop with next neighbor
      if (visitedNodes.has(neighborNode)) { continue; }
      // if above statement is not true  continue with the lines below
      const newPathWeight = shortestPathSoFar.get(currentNode) + neighborWeight;
      // if shortest path so far doesn't have any neighbor nodes OR if new path weight is less than the shortest path so far continue into the if statement logic
      if (!shortestPathSoFar.has(neighborNode) || newPathWeight < shortestPathSoFar.get(neighborNode)) {
        //set shortest path to neighbor node and new path weight
        shortestPathSoFar.set(neighborNode, newPathWeight);
        // set the parent map key to the neighbor node and the value current node (Node { value: 45 } => Node { value: 5})
        parentMap.set(neighborNode, currentNode);
        // set the priority properties to the neighbor node values and the priority to the shortest path to the neighbor node
        priorityQueue.queue({
          node: neighborNode,
          priority: shortestPathSoFar.get(neighborNode),
        });
      }
    }
  }
  return null;
};
