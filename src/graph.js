var assert = require('assert');

var graph1 = {
	vertex: ["1","2","3"],
	edge: [
	/* vertex1, vertex2, weight */
		["1", "2", 4],
		["1", "3", 7],
		["2", "3", 1]
	]
},
graph2 = {
	vertex: ["1","2","3","4","5","6"],
	edge: [
	/* vertex1, vertex2, weight */
		["1", "2", 7],
		["1", "3", 9],
		["1", "6", 14],
		["2", "3", 10],
		["2", "4", 15],
		["3", "4", 11],
		["3", "6", 2],
		["4", "5", 6],
		["5", "6", 9]
	]
};

function times(val, n) {
  var res = [];
  for(var i=0; i<n; i+=1) {
    res.push(val);
  }
  return res;
}

/************* algorighms to solve shortest path problem *************/

function adjacencyList2adjacencyMatrix(graph) {
  var matrix=[],
      vertexDic={},
      vertexes = graph.vertex,
      edges = graph.edge;

  vertexes.forEach(function(v, i) {
    matrix[i]=times(Infinity, vertexes.length);
    matrix[i][i]=0;
    vertexDic[v]=i;
  });
  
  edges.forEach(function(e) {
    var from=vertexDic[e[0]],
        to=vertexDic[e[1]],
        cost=e[2];
    matrix[from][to]=cost;
  });

  return matrix;
}

function dijkstra(start, graph) {
  var dist = {},
      unfixed = {},
      i, v;

  // Setup distance sentinel
  graph.vertex.forEach(function(v_i) {
    dist[v_i] = Infinity;
    unfixed[v_i] = true;
  });

  dist[start] = 0;

  while (Object.keys(unfixed).length > 0) {
    // Obtain a vertex whose distaance is minimum and unfixed.
    v = Object.keys(unfixed).reduce(function(prev, v) {
      return dist[prev] > dist[v] ? +v : prev;
    }, Object.keys(unfixed)[0]);

    graph.edge.filter(function(edge) {
        var from = edge[0];
        return from===v;
      })
      .forEach(function(edge) {
	var to = edge[1],
	    cost=edge[2];

	dist[to] = Math.min(dist[to], dist[v] + cost);
      });

    // Mark that distance is fixed
    delete unfixed[v];
  }

  return dist;
};

// dijkstra for adjascent matrix (not adjascent list)
function dijkstra_matrix(start, cost) {
  var unfixed = {},
      dist = [],
      vertNum = cost[0].length,
      i, v;

  // initialize distance and visited vertex set
  for(i=0; i<vertNum; i+=1) {
    dist[i] = Infinity;
    unfixed[i] = true;
  }

  dist[start]=0;

  while(Object.keys(unfixed).length>0) {

    v = Object.keys(unfixed).reduce(function(prev, v) {
      return dist[prev] > dist[v] ? +v : prev;
    }, Object.keys(unfixed)[0]);

    for(i=0; i<vertNum; i+=1) {
      dist[i] = Math.min(dist[i], dist[v]+cost[v][i]);
    }
    delete unfixed[v];
  }

  return dist;
}

function bellmanford(start, graph) {
  var updated=true,
      dist = graph.vertex.reduce(function(dist, cur) {
	dist[cur] = Infinity;
	return dist;
      }, {});

  dist[start]=0;

  while(updated) {
    graph.edge.forEach(function(edge) {
      var from=edge[0],
          to=edge[1],
          cost=edge[2],
          org=dist[to];

      dist[to] = Math.min(dist[to], dist[from]+cost);
      updated = dist[to]!==org;
    });
  }
  return dist;
}

function floyedWarshall(matrix) {
  var i,j,k,len=matrix.length;

  for(k=0; k<len; k+=1) {
    for(i=0; i<len; i+=1) {
      for(j=0; j<len; j+=1) {
	matrix[i][j] = Math.min(matrix[i][j], matrix[i][k]+matrix[k][j]);
      }
    }
  }
  return matrix;
}

console.log("dijkstra", dijkstra("1", graph2));
console.log("bellmanford", bellmanford("1", graph2));
var adjascentMatrix=adjacencyList2adjacencyMatrix(graph2);
console.log("dijkstra_matrix", dijkstra_matrix(0, adjascentMatrix));
console.log("floyd-warshall", floyedWarshall(adjascentMatrix));

/************* algorighms to find minimum spanning tree *************/

function prim(graph) {
  var dist = 0, visitedSet = {}, vCount = graph.vertex.length, visitedList, u, v, i, minCost, edge;

  visitedSet[graph.vertex[0]] = true;
  
  while ((visitedList = Object.keys(visitedSet)).length < vCount) {
    minCost = Infinity;
    for (i=0; i<graph.edge.length; i+=1) {
      visitedList = Object.keys(visitedSet);
      edge = graph.edge[i];

      if (visitedList.indexOf(edge[0])<0 && visitedList.indexOf(edge[1])>-1) {
	u = edge[0];
      } else if (visitedList.indexOf(edge[1])<0 && visitedList.indexOf(edge[0])>-1) {
	u = edge[1];
      } else {
	continue;
      }
      if (edge[2]<minCost) {
	v = u;
	minCost = edge[2];
      }
    }
    visitedSet[v] = true;
    dist += minCost;
  }

  return dist;
}

// union-find tree for Kruskal's algorithm

function UnionFind(n) {
  this.parent=[];
  this.rank=[];
  for (var i = 0; i < n; i++) {
    this.parent[i] = i;
    this.rank[i] = 0;
  }
}

UnionFind.prototype.findRoot = function(x) {
  if (this.parent[x] === x) return x;

  // path compression in search
  // no update of rank to reduce complexity
  this.parent[x] = this.findRoot(this.parent[x]);
  return this.parent[x];
};
UnionFind.prototype.unite = function(x, y) {
  x = this.findRoot(x);
  y = this.findRoot(y);

  // already in the same set
  if (x == y) return;

  // path compression
  if (this.rank[x] < this.rank[y]) {
    this.parent[x] = y;
  } else {
    this.parent[y] = x;
    if (this.rank[x] === this.rank[y]) this.rank[x]++;
  }
};
UnionFind.prototype.isSame = function(x, y) {
  return this.findRoot(x) == this.findRoot(y);
};

var primRes = prim(graph2);
console.log("prim", primRes);
assert.equal(primRes, 33);

var uf = new UnionFind(2);
uf.unite(0,1);
assert.equal(true, uf.isSame(0,1));

graph2 = {
	vertex: ["1","2","3","4","5","6"],
	edge: [
	/* vertex1, vertex2, weight */
		["1", "2", 7],
		["1", "3", 9],
		["1", "6", 14],
		["2", "3", 10],
		["2", "4", 15],
		["3", "4", 11],
		["3", "6", 2],
		["4", "5", 6],
		["5", "6", 9]
	]
};

// http://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/098478280X
// Q 4.2
function has_path(graph, start, end) {
  var cur = start, buf = [], visited = {}, paths = graph.edge.reduce(function(set, e){
    set[e[0]] = set[e[0]] || [];
    set[e[0]].push(e);
    return set;
  }, {});
  buf.push(cur);
  while (buf.length>0 && Object.keys(visited).length<graph.vertex.length) {
    cur = buf.pop();
    if (cur==end) return true;
    // Mark visited
    visited[cur] = true;
    if (paths[cur]==null) continue;
    buf = buf.concat(paths[cur].filter(function(edge) {
      return visited[edge[1]] == null;
    }).map(function(edge) {
      return edge[1];
    }));
  }
  return false;
}

console.log(has_path(graph2, 3, 2));

