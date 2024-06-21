class PriorityQueue {
  constructor() {
    this.collection = [];
  }

  enqueue(element) {
    if (this.isEmpty()) {
      this.collection.push(element);
    } else {
      let added = false;
      for (let i = 1; i <= this.collection.length; i++) {
        if (element[1] < this.collection[i - 1][1]) {
          this.collection.splice(i - 1, 0, element);
          added = true;
          break;
        }
      }
      if (!added) {
        this.collection.push(element);
      }
    }
  }

  dequeue() {
    return this.collection.shift();
  }

  isEmpty() {
    return this.collection.length === 0;
  }
}

const dijkstra = (graph, startNode) => {
  let distances = {};
  let pq = new PriorityQueue();
  let previous = {};

  distances[startNode] = 0;
  pq.enqueue([startNode, 0]);

  graph.nodes.forEach((node) => {
    if (node !== startNode) {
      distances[node] = Infinity;
    }
    previous[node] = null;
  });

  while (!pq.isEmpty()) {
    let shortestStep = pq.dequeue();
    let currentNode = shortestStep[0];

    graph.edges[currentNode].forEach((neighbor) => {
      let alt = distances[currentNode] + neighbor.weight;
      if (alt < distances[neighbor.node]) {
        distances[neighbor.node] = alt;
        previous[neighbor.node] = currentNode;
        pq.enqueue([neighbor.node, distances[neighbor.node]]);
      }
    });
  }

  return { distances, previous };
};

module.exports = { dijkstra };
