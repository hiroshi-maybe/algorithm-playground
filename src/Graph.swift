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
  
  func adjascent(vertex: VertexID) -> [VertexID] {
    return edge
      .filter { $0.from == vertex }
      .map { $0.to }
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
