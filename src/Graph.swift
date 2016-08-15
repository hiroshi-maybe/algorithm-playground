//
//  Graph.swift
//  
//
//  Created by kori on 8/13/16.
//
//

import Foundation

struct Graph {
  typealias VertexID = Int
  let vertex: [VertexID]
  let edge: [(from: VertexID, to: VertexID, weight: Int)]
  
  func vertexDic<T>(initial: T) -> [VertexID: T] {
    var dic = [VertexID: T]()
    vertex.forEach {
      dic[$0] = initial
    }
    
    return dic
  }
  
  func adjascent(vertex: VertexID) -> [VertexID] {
    return edge
      .filter { $0.from == vertex }
      .map { $0.to }
  }
  
  func adjascent(vertex: VertexID) -> [(vertex: VertexID, weight: Int)] {
    return edge
      .filter { $0.from == vertex }
      .map { (vertex: $0.to, weight: $0.weight) }
  }
}

let graph1 = Graph(
  vertex: [1, 2, 3, 4, 5, 6, 7],
  edge: [
    (from: 1, to: 2, weight: 7),
    (from: 1, to: 3, weight: 9),
    (from: 1, to: 6, weight: 14),
    (from: 2, to: 3, weight: 10),
    (from: 2, to: 4, weight: 15),
    (from: 3, to: 4, weight: 11),
    (from: 3, to: 6, weight: 2),
    (from: 4, to: 5, weight: 6),
    (from: 4, to: 1, weight: 6),
    (from: 5, to: 6, weight: 9)
  ]
)

/*
  visiting = [1]
  visited = []
 
  [2,3,6] = adjascent(1)
  visited=[1]
  visiting=[2,3,6]
 
  [3,4] = adjascent(2)
  visited=[1,2]
  visiting=[3,6,4]

  [4,6] = adjascent(3)
  visited=[1,2,3]
  visiting=[4,6]
 
  .. until visiting is empty
 
 */

// Time complexity: O(|V|+|E|) in worst case
// Space complexity: O(
func findPath(graph: Graph, start: Graph.VertexID, end: Graph.VertexID) -> Bool {
  var visited: Set<Graph.VertexID> = []
  var visiting: Set<Graph.VertexID> = [start]
  
  while let visitingNode = visiting.first {
    visiting.remove(visitingNode)
    // invariant: at least one node to check
    
    let unvisitedAdjascents = graph.adjascent(visitingNode).filter { !visited.contains($0) }
    
    if unvisitedAdjascents.indexOf({ $0==end }) != nil { return true }
    
    visited.insert(visitingNode)
    visiting = visiting.union(unvisitedAdjascents)
  }
  
  return false
}

assert(findPath(graph1, start: 1, end: 5))
assert(!findPath(graph1, start: 1, end: 7))

// Time complexity: O(E + V^2), E is size of edges, V is size of vertices (E < V^2)
// Space complexity: O(V)
func shortestPathDikjkstra(graph: Graph, start: Graph.VertexID, end: Graph.VertexID) -> Int {
  var distances: [Graph.VertexID: Int] = graph.vertexDic(Int.max)
  var vertex = Set(graph.vertex)
  
  distances[start] = 0

  while !vertex.isEmpty {
    let shortestDistance = shortestVertex(vertex, distances: distances) // O(V)
    vertex.remove(shortestDistance.vertex)
    
    graph.adjascent(shortestDistance.vertex).forEach { // this goes through O(E) for all vertices
      distances[$0.vertex] = min(distances[$0.vertex]!, shortestDistance.distance + $0.weight)
    }
  }
  
  return distances[end]!
}

func shortestVertex(vertex: Set<Graph.VertexID>, distances: [Graph.VertexID: Int]) -> (vertex: Graph.VertexID, distance: Int)! {
  return vertex
    .map { ($0, distances[$0]!) }
    .sort { $0.1 < $1.1 } // actually should just iterate to achieve time complexity O(V)
    .first!
}

assert(shortestPathDikjkstra(graph1, start: 1, end: 6)==11)
