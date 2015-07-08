var graph1 = {
	vertex: ["1","2","3"],
	edge: [,
	/* vertex1, vertex2, weight */
		["1", "2", 4],
		["1", "3", 7],
		["2", "3", 1]
	]
},
graph2 = {
	vertex: ["1","2","3","4","5","6"],
	edge: [,
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

function dijkstra(start, graph) {
	var distance = {},
		prev = {},
		vertices = {},
		u;

	// Setup distance sentinel
	graph.vertex.forEach(function(v_i) {
		distance[v_i] = Infinity;
		prev[v_i] = null;
		vertices[v_i] = true;
	});

	distance[start] = 0;

	while (Object.keys(vertices).length > 0) {
		// Obtain a vertex whose distaance is minimum.
		u = Object.keys(vertices).reduce(function(prev, v_i) {
			return distance[prev] > distance[v_i] ? +v_i : prev;
		}, Object.keys(vertices)[0]);

		graph.edge.filter(function(edge) {
			var from = edge[0],
				to 	 = edge[1];
			return from===u || to===u;
		})
		.forEach(function(edge) {
			var to = edge[1]===u ? edge[0] : edge[1],
				dist = distance[u] + edge[2];

			if (distance[to] > dist) {
				distance[to] = dist;
				prev[to] = u;
			}
		});
		// Mark visited
		delete vertices[u];
	}
	return distance;
};

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

console.log("dijkstra", dijkstra("1", graph2));
console.log("bellmanford", bellmanford("1", graph2));

graph2 = {
	vertex: ["1","2","3","4","5","6"],
	edge: [,
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

